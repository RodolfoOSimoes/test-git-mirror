import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SpotifyService } from 'src/apis/spotify/spotify.service';
import { User } from 'src/entities/user.entity';
import {
  In,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { formatDate } from 'src/utils/date.utils';
import { Campaign } from 'src/entities/campaign.entity';
import { Rescue } from 'src/entities/rescue.entity';
import { RecentlyPlayeds } from 'src/entities/recently-playeds.entity';
import { CashBack } from 'src/entities/cash-backs.entity';
import { Statement } from 'src/entities/statement.entity';
import { Quest } from 'src/entities/quest.entity';
import { QuestSpotifyPlaylists } from 'src/entities/quest-spotify-playlists.entity';
import { UserQuestSpotifyPlaylist } from 'src/entities/user-quest-spotify-playlists.entity';
import { Between } from 'typeorm';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class RecentlyPlayedJob {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('CAMPAIGN_REPOSITORY')
    private campaignRepository: Repository<Campaign>,
    @Inject('RESCUE_REPOSITORY')
    private rescueRepository: Repository<Rescue>,
    @Inject('RECENTLY_PLAYEDS_REPOSITORY')
    private recentlyRepository: Repository<RecentlyPlayeds>,
    @Inject('CASH_BACK_REPOSITORY')
    private cashBackRepository: Repository<CashBack>,
    @Inject('STATEMENT_REPOSITORY')
    private statementRepository: Repository<Statement>,
    @Inject('QUEST_REPOSITORY')
    private questRepository: Repository<Quest>,
    @Inject('USER_QUEST_SPOTIFY_PLAYLISTS_REPOSITORY')
    private userQuestSpotifyRepository: Repository<UserQuestSpotifyPlaylist>,
    private spotifyService: SpotifyService,
    @InjectQueue('recently_playeds_queue') private recentlyQueue: Queue,
  ) {}

  // @Cron('60 * * * * *')
  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    console.time('recently_played');
    const listUsers = await this.loadUsers();

    // // while (listUsers.length > 0) {
    //   const users = listUsers.splice(0, 10);
    //   await this.recentlyQueue.add(users);
    // // }
    await this.runJob(listUsers);

    console.timeEnd('recently_played');
  }

  async runJob(users: User[]) {
    users.forEach(async (user) => {
      try {
        const loadLastTimeVerify = await this.loadLastTimeVerify(user);

        const credentials = user.credentials;
        const recentlyPlayeds = await this.spotifyService.getRecentlyPlayed(
          credentials['refresh_token'],
          loadLastTimeVerify,
        );

        const recently = this.prepareRecentlyPlayed(recentlyPlayeds);

        if (recently) {
          const [questPlaylistSpotify, campaign, rescues] = await Promise.all([
            this.loadSpotifyPlaylistQuests(),
            this.loadCampaign(),
            this.loadRescues(),
          ]);
          await this.saveCashBacks(
            user,
            rescues,
            recentlyPlayeds,
            campaign,
            questPlaylistSpotify,
          );
          await this.updateUser(user, recently);
          await this.saveRecentlyPlaylist(user, recently);
        }
      } catch (error) {
        console.log(`${user.id} - ${error.message}`);
      }
    });
  }

  async loadUsers(): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        deleted: false,
        situation: false,
        have_accepted: true,
        last_time_verified: LessThan(new Date().getTime()),
        id: 101015,
      },
      select: ['id', 'credentials', 'last_heard'],
    });
  }

  async loadLastTimeVerify(user) {
    const recently = await this.recentlyRepository.findOne({
      where: { user: user },
      select: ['content'],
      order: { created_at: 'DESC' },
    });
    try {
      return recently.content['cursors']['after'];
    } catch (error) {
      return '0';
    }
  }

  async loadCampaign(): Promise<Campaign> {
    return await this.campaignRepository.findOne({
      where: {
        status: true,
        date_start: LessThanOrEqual(formatDate(new Date())),
        date_finish: MoreThanOrEqual(formatDate(new Date())),
      },
      select: ['id'],
    });
  }

  async loadRescues() {
    return await this.rescueRepository.find({
      order: { id: 'DESC' },
      where: { deleted: false, status: true },
    });
  }

  async updateUser(user: User, recently: any) {
    await this.userRepository.update(user.id, {
      last_time_verified: new Date().getTime(),
      last_heard: this.getLastHeardTime(recently),
    });
  }

  getLastHeardTime(recently) {
    return new Date(recently?.items[recently?.items?.length - 1]?.played_at);
  }

  sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  prepareRecentlyPlayed(recently: any) {
    if (!recently?.items?.length) return undefined;

    return {
      cursors: recently.cursors,
      next: recently.next,
      items: recently.items.map((item) => {
        return {
          context: item.context,
          played_at: item.played_at,
          track: {
            href: item.track.href,
            url: item.track.url,
            duration_ms: item.track.duration_ms,
            name: item.track.name,
          },
        };
      }),
    };
  }

  getLimits(cashbacks: CashBack[], rescues: Rescue[]) {
    const uniqueCashbacks = [];

    cashbacks.forEach((cashback) => {
      const cb = uniqueCashbacks.find(
        (cb) => cb.track_id === cashback.track_id,
      );
      if (!cb) {
        uniqueCashbacks.push({
          track_id: cashback.track_id,
          count: 1,
        });
      } else {
        cb.count++;
      }
    });

    const allowedCashbackLimit = [];

    rescues.forEach((rescue) => {
      const cb = uniqueCashbacks.find((cb) => cb.track_id === rescue.uid);
      if (cb && rescue.limited) {
        allowedCashbackLimit.push({
          track_id: rescue.uid,
          limit: rescue.limit_streams - cb.count,
        });
      } else if (!cb && rescue.limited) {
        allowedCashbackLimit.push({
          track_id: rescue.uid,
          limit: rescue.limit_streams,
        });
      }
    });

    return allowedCashbackLimit;
  }

  getYesterday() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  async saveRecentlyPlaylist(user: User, recently: any) {
    await this.recentlyRepository.save({
      user: user,
      content: recently,
      listen_times: recently?.items?.length || 0,
      checked_in: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  async loadSpotifyPlaylistQuests() {
    const quests = await this.questRepository.find({
      where: {
        date_start: LessThan(new Date()),
        status: true,
        deleted: false,
        kind: 12,
      },
      order: { date_start: 'DESC' },
      relations: ['quest_spotify_playlists'],
    });

    const questSpotifyPlaylist: QuestSpotifyPlaylists[] = [];
    quests.forEach((quest) =>
      questSpotifyPlaylist.push(quest.quest_spotify_playlists),
    );

    return questSpotifyPlaylist;
  }

  async loadUserQuestSpotifyPlaylists(
    user: User,
    questSpotifyPlaylist: QuestSpotifyPlaylists[],
  ) {
    const userQuest = await this.userQuestSpotifyRepository.find({
      where: {
        quest_spotify_playlists: In(questSpotifyPlaylist.map((qsp) => qsp.id)),
        user,
      },
      relations: ['quest_spotify_playlists'],
    });

    return userQuest;
  }

  async saveCashBacks(
    user: User,
    rescues: Rescue[],
    recently: any,
    campaign: Campaign,
    questSpotifyPlaylist: QuestSpotifyPlaylists[],
  ) {
    const todayCashBacks = await this.cashBackRepository.find({
      where: { user: user, played_at: MoreThan(this.getYesterday()) },
      order: { track_id: 'DESC' },
    });

    const cashbacksLimit = this.getLimits(todayCashBacks, rescues);

    const userQuestSpotify = await this.loadUserQuestSpotifyPlaylists(
      user,
      questSpotifyPlaylist,
    );

    const userQuestPlaylist = [];

    const statementCashbacks = [];

    recently.items.forEach((item) => {
      const isrc = item['track']['external_ids']['isrc'];
      const rescue = rescues.find((rescue) => rescue.isrc == isrc);
      const todayCashback = cashbacksLimit.find(
        (cb) => cb.track_id == item['track']['id'],
      );
      questSpotifyPlaylist.forEach((qsp) => {
        if (qsp.isrcs.includes(isrc)) {
          const userQuest = userQuestSpotify.find(
            (uqs) => uqs.quest_spotify_playlists.id == qsp.id,
          );

          const filteredUserQuest = userQuestPlaylist.find(
            (uqp) => uqp.playlist_id == qsp.id,
          );

          if (!userQuest && !filteredUserQuest) {
            userQuestPlaylist.push({
              isrcs: `---\r\n- ${isrc}`,
              playlist_id: qsp.id,
              playlist: qsp,
              id: null,
              user: user,
            });
          } else if (
            filteredUserQuest &&
            !filteredUserQuest.isrcs.includes(isrc)
          ) {
            filteredUserQuest.isrcs = `${filteredUserQuest.isrcs}\r\n- ${isrc}`;
          } else if (userQuest) {
            userQuestPlaylist.push({
              isrcs: !userQuest.isrcs.includes(isrc)
                ? `${userQuest.isrcs}\r\n- ${isrc}`
                : userQuest.isrcs,
              playlist_id: qsp.id,
              playlist: qsp,
              id: userQuest.id,
              user: user,
            });
          }
        }
      });

      if (rescue && todayCashback && todayCashback.limit > 0) {
        todayCashback.limit--;
        statementCashbacks.push({
          user_id: user.id,
          rescue_id: rescue,
          track_id: item['track']['id'],
          played_at: item['played_at'],
          name: item['track']['name'],
          score: rescue.score,
        });
      }
    });

    const userQuestSpotifySave: UserQuestSpotifyPlaylist[] = [];
    const userQuestSpotifyUpdate: UserQuestSpotifyPlaylist[] = [];

    userQuestPlaylist.forEach((uqp) => {
      const userQuestSpotify = new UserQuestSpotifyPlaylist();
      userQuestSpotify.updated_at = new Date();
      userQuestSpotify.isrcs = uqp.isrcs;
      if (uqp.id) {
        userQuestSpotify.id = uqp.id;
        userQuestSpotifyUpdate.push(userQuestSpotify);
      } else {
        userQuestSpotify.user = user;
        userQuestSpotify.quest_spotify_playlists = uqp.playlist;
        userQuestSpotify.created_at = new Date();
        userQuestSpotifySave.push(userQuestSpotify);
      }
    });

    const statements: Statement[] = [];
    const cashbacks: CashBack[] = [];

    statementCashbacks.forEach((cashback) => {
      cashbacks.push(this.buildCashBack(cashback, user));
      statements.push(this.buildStatement(cashback, user, campaign));
    });

    try {
      await Promise.all([
        this.statementRepository.save(statements),
        this.cashBackRepository.save(cashbacks),
        this.userQuestSpotifyRepository.save(userQuestSpotifySave),
      ]);
      userQuestSpotifyUpdate.forEach(
        async (uqs) =>
          await this.userQuestSpotifyRepository.update(uqs.id, uqs),
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  buildCashBack(cb: any, user: User): CashBack {
    const cashback = new CashBack();
    cashback.user = user;
    cashback.track_id = cb.track_id;
    cashback.played_at = cb.played_at;
    cashback.name = cb.name;
    cashback.rescue = cb.rescue_id;
    cashback.deleted = false;
    cashback.created_at = new Date();
    cashback.updated_at = new Date();
    return cashback;
  }

  buildStatement(cb: any, user: User, campaign: Campaign) {
    const statement = new Statement();
    statement.user = user;
    statement.campaign = campaign;
    statement.amount = cb.score;
    statement.kind = 1;
    statement.statementable_type = 'CashBack';
    statement.balance = 0;
    statement.statementable_id = cb.rescue_id.id;
    statement.expiration_date = new Date(
      new Date().setDate(new Date().getDate() + 90),
    );
    statement.created_at = new Date();
    statement.updated_at = new Date();
    return statement;
  }
}
