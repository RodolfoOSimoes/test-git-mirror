import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SpotifyService } from 'src/apis/spotify/spotify.service';
import { AccomplishedQuests } from 'src/entities/accomplished-quest.entity';
import { Campaign } from 'src/entities/campaign.entity';
import { PreSaveUser } from 'src/entities/pre-save-users.entity';
import { QuestPreSaves } from 'src/entities/quest-pre-saves.entity';
import { QuestQuestions } from 'src/entities/quest-questions.entity';
import { QuestSpotifies } from 'src/entities/quest-spotifies.entity';
import { QuestSpotifyPlaylists } from 'src/entities/quest-spotify-playlists.entity';
import { Quest } from 'src/entities/quest.entity';
import { Statement } from 'src/entities/statement.entity';
import { UserQuestSpotifyPlaylist } from 'src/entities/user-quest-spotify-playlists.entity';
import { User } from 'src/entities/user.entity';
import { QuestMissionType } from 'src/enums/QuestTypes';
import { formatDate } from 'src/utils/date.utils';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { LessThan, Repository } from 'typeorm';
import TrackNotListenedError from 'src/utils/errors/TrackNotListenedError';

@Injectable()
export class QuestService {
  constructor(
    @Inject('QUEST_REPOSITORY')
    private questsRepository: Repository<Quest>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('USER_QUEST_SPOTIFY_PLAYLISTS_REPOSITORY')
    private userQuestSpotifyRepository: Repository<UserQuestSpotifyPlaylist>,
    @Inject('QUEST_SPOTIFY_PLAYLISTS_REPOSITORY')
    private questSpotifyPlaylistRepository: Repository<QuestSpotifyPlaylists>,
    @Inject('ACCOMPLISHED_QUEST_REPOSITORY')
    private accomplishedQuestsRepository: Repository<AccomplishedQuests>,
    @Inject('QUEST_SPOTIFIES_REPOSITORY')
    private questSpotifyRepository: Repository<QuestSpotifies>,
    @Inject('QUEST_QUESTIONS_REPOSITORY')
    private questQuestionRepository: Repository<QuestQuestions>,
    @Inject('STATEMENT_REPOSITORY')
    private statementRepository: Repository<Statement>,
    @Inject('CAMPAIGN_REPOSITORY')
    private campaignRepository: Repository<Campaign>,
    @Inject('PRE_SAVE_USER_REPOSITORY')
    private preSaveUserRepository: Repository<PreSaveUser>,
    @Inject('QUEST_PRE_SAVES_REPOSITORY')
    private preSaveRepository: Repository<QuestPreSaves>,
    private paginationService: PaginationService,
  ) {}

  async findAll(user_id: number) {
    const resultPromise = this.questsRepository.find({
      where: { date_start: LessThan(new Date()), status: true, deleted: false },
      order: { date_start: 'DESC' },
      relations: [
        'quest_spotifies',
        'quest_opts',
        'quest_pre_saves',
        'quest_questions',
        'quest_spotify_playlists',
        'quest_youtubes',
      ],
    });

    const userPromise = this.userRepository.findOne(user_id, {
      relations: [
        'accomplished_quests',
        'accomplished_quests.quest',
        'accomplished_quests.quest.quest_spotify_playlists',
      ],
    });

    const [result, user] = await Promise.all([resultPromise, userPromise]);

    const userQuestSpotify = await this.userQuestSpotifyRepository.find({
      where: { user: user },
      relations: ['quest_spotify_playlists'],
    });

    const data = this.formatQuest(
      result,
      user.accomplished_quests,
      userQuestSpotify,
    );

    return {
      data,
      size: Math.ceil(result.length / 100),
      links: this.paginationService.pagination(
        'v1/app/quests',
        0,
        100,
        result.length,
      ),
    };
  }

  async update(
    user_id: number,
    quest_id: number,
    body: any,
    query: any,
  ): Promise<{ hasError: boolean; message?: any; answer?: Array<string> }> {
    const quest = await this.questsRepository.findOne(quest_id, {
      relations: ['quest_spotify_playlists'],
    });

    if (!this.isActiveQuest(quest)) {
      return {
        hasError: true,
        message: 'Requisição inválida',
      };
    }

    const user = await this.userRepository.findOne(user_id);

    if (await this.isQuestAlreadyAccomplishedAsync(user, quest)) {
      return {
        hasError: true,
        message: 'Missão já executada',
      };
    }

    const campaign = await this.campaignRepository.findOne({
      status: true,
      date_start: LessThanOrEqual(formatDate(new Date())),
      date_finish: MoreThanOrEqual(formatDate(new Date())),
    });

    const kind = QuestMissionType[quest?.kind];

    // TODO: verificar lógica do spotify_listen_track
    // TODO: verificar lógica do youtube_subscribe
    // TODO: criar job para dar follow nos presaves, setar saved para true quando der follow
    // TODO: quest_spotify_playlist só libera para responder quando ouve a quantidade de músicas selecionadas * complete = false
    // quando completar colocar a quantidade de músicas completadas
    // verificar se é 1 ou 2 perguntas pelo q vem do banco

    const spotifyService = new SpotifyService();

    if (kind == 'spotify_follow_playlist') {
      quest.quest_spotifies = await this.questSpotifyRepository.findOne({
        where: { quest: quest },
      });

      const followPlaylistPromise = spotifyService.followPlaylist(
        user.credentials['token'],
        quest.quest_spotifies.uid,
      );
      const accomplishedPromise = this.accomplishedQuestsRepository.save({
        quest: quest,
        user: user,
        created_at: new Date(),
        updated_at: new Date(),
      });
      const statementPromise = this.statementRepository.save({
        user: user,
        campaign: campaign,
        amount: quest.score,
        kind: 1,
        statementable_type: 'Quest',
        balance: 0,
        statementable_id: quest.id,
        expiration_date: new Date(
          new Date().setDate(new Date().getDate() + 90),
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
      await Promise.all([
        statementPromise,
        accomplishedPromise,
        followPlaylistPromise,
      ]);
    }
    if (kind == 'spotify_follow_artist') {
      quest.quest_spotifies = await this.questSpotifyRepository.findOne({
        where: { quest: quest },
      });

      const followArtist = spotifyService.followArtist(
        user.credentials['token'],
        quest.quest_spotifies.uid,
      );
      const accomplishedPromise = this.accomplishedQuestsRepository.save({
        quest: quest,
        user: user,
        created_at: new Date(),
        updated_at: new Date(),
      });
      const statementPromise = this.statementRepository.save({
        user: user,
        campaign: campaign,
        amount: quest.score,
        kind: 1,
        statementable_type: 'Quest',
        balance: 0,
        statementable_id: quest.id,
        expiration_date: new Date(
          new Date().setDate(new Date().getDate() + 90),
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
      await Promise.all([statementPromise, accomplishedPromise, followArtist]);
    }
    if (kind == 'spotify_save_album') {
      quest.quest_spotifies = await this.questSpotifyRepository.findOne({
        where: { quest: quest },
      });

      const followAlbum = await spotifyService.followAlbum(
        user.credentials['token'],
        quest.quest_spotifies.uid,
      );
      const accomplishedPromise = this.accomplishedQuestsRepository.save({
        quest: quest,
        user: user,
        created_at: new Date(),
        updated_at: new Date(),
      });
      const statementPromise = this.statementRepository.save({
        user: user,
        campaign: campaign,
        amount: quest.score,
        kind: 1,
        statementable_type: 'Quest',
        balance: 0,
        statementable_id: quest.id,
        expiration_date: new Date(
          new Date().setDate(new Date().getDate() + 90),
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
      await Promise.all([statementPromise, accomplishedPromise, followAlbum]);
    }
    if (kind == 'spotify_save_track') {
      quest.quest_spotifies = await this.questSpotifyRepository.findOne({
        where: { quest: quest },
      });

      const saveTrack = await spotifyService.saveTrack(
        user.credentials['token'],
        quest.quest_spotifies.uid,
      );
      const accomplishedPromise = this.accomplishedQuestsRepository.save({
        quest: quest,
        user: user,
        created_at: new Date(),
        updated_at: new Date(),
      });
      const statementPromise = this.statementRepository.save({
        user: user,
        campaign: campaign,
        amount: quest.score,
        kind: 1,
        statementable_type: 'Quest',
        balance: 0,
        statementable_id: quest.id,
        expiration_date: new Date(
          new Date().setDate(new Date().getDate() + 90),
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
      await Promise.all([statementPromise, accomplishedPromise, saveTrack]);
    }
    if (kind == 'question') {
      quest.quest_questions = await this.questQuestionRepository.findOne({
        where: { quest: quest },
      });

      const awnser = quest.quest_questions.answer;
      if (!body['answer'])
        return {
          hasError: true,
          answer: ['Você precisa inserir uma resposta'],
        };
      if (body['answer'] != awnser)
        return {
          hasError: true,
          message: 'Responsta incorreta',
        };

      const accomplishedPromise = this.accomplishedQuestsRepository.save({
        quest: quest,
        user: user,
        created_at: new Date(),
        updated_at: new Date(),
      });
      const statementPromise = this.statementRepository.save({
        user: user,
        campaign: campaign,
        amount: quest.score,
        kind: 1,
        statementable_type: 'Quest',
        balance: 0,
        statementable_id: quest.id,
        expiration_date: new Date(
          new Date().setDate(new Date().getDate() + 90),
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
      await Promise.all([statementPromise, accomplishedPromise]);
    }
    if (kind == 'youtube_watch_video') {
      const accomplishedPromise = this.accomplishedQuestsRepository.save({
        quest: quest,
        user: user,
        created_at: new Date(),
        updated_at: new Date(),
      });
      const statementPromise = this.statementRepository.save({
        user: user,
        campaign: campaign,
        amount: quest.score,
        kind: 1,
        statementable_type: 'Quest',
        balance: 0,
        statementable_id: quest.id,
        expiration_date: new Date(
          new Date().setDate(new Date().getDate() + 90),
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
      await Promise.all([statementPromise, accomplishedPromise]);
    }
    if (kind == 'pre_save') {
      quest.quest_pre_saves = await this.preSaveRepository.findOne({
        where: { quest: quest },
      });

      const preSavePromisse = this.preSaveUserRepository.save({
        created_at: new Date(),
        updated_at: new Date(),
        saved: false,
        quest_pre_save: quest.quest_pre_saves,
        user: user,
      });

      const accomplishedPromise = this.accomplishedQuestsRepository.save({
        quest: quest,
        user: user,
        created_at: new Date(),
        updated_at: new Date(),
      });
      const statementPromise = this.statementRepository.save({
        user: user,
        campaign: campaign,
        amount: quest.score,
        kind: 1,
        statementable_type: 'Quest',
        balance: 0,
        statementable_id: quest.id,
        expiration_date: new Date(
          new Date().setDate(new Date().getDate() + 90),
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
      await Promise.all([
        statementPromise,
        accomplishedPromise,
        preSavePromisse,
      ]);
    }
    if (kind == 'opt') {
      const email = body?.['quest']?.['email'];

      if (!email || (email && !this.validateEmail(email))) {
        return {
          hasError: true,
          message: {
            email: ['E-mail inválido'],
          },
        };
      }

      const userPromisse = this.userRepository.update(user_id, {
        email: email.toLowerCase(),
        updated_at: new Date(),
      });

      const accomplishedPromise = this.accomplishedQuestsRepository.save({
        quest: quest,
        user: user,
        created_at: new Date(),
        updated_at: new Date(),
      });
      const statementPromise = this.statementRepository.save({
        user: user,
        campaign: campaign,
        amount: quest.score,
        kind: 1,
        statementable_type: 'Quest',
        balance: 0,
        statementable_id: quest.id,
        expiration_date: new Date(
          new Date().setDate(new Date().getDate() + 90),
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
      await Promise.all([statementPromise, accomplishedPromise, userPromisse]);
    }
    if (kind == 'quest_spotify_playlist') {
      const questAnswer = body?.['quest']?.['answer'];
      quest.quest_spotify_playlists =
        await this.questSpotifyPlaylistRepository.findOne({
          where: { quest: quest },
        });
      if (!questAnswer)
        return {
          hasError: true,
          answer: ['Você precisa inserir uma resposta'],
        };

      const userQuestSpotify = await this.userQuestSpotifyRepository.findOne({
        where: {
          user: user,
          quest_spotify_playlists: quest.quest_spotify_playlists,
        },
        relations: ['quest_spotify_playlists'],
      });
      if (!userQuestSpotify) {
        return {
          hasError: true,
          message: 'Você precisa aguardar o processamento das músicas.',
        };
      }

      if (
        (!userQuestSpotify.question_answered &&
          userQuestSpotify.quest_spotify_playlists.answer != questAnswer) ||
        (userQuestSpotify.question_answered &&
          userQuestSpotify.quest_spotify_playlists?.answer_2 != questAnswer)
      ) {
        return {
          hasError: true,
          message: 'Resposta incorreta.',
        };
      }

      if (!userQuestSpotify.question_answered) {
        await this.statementRepository.save({
          user: user,
          campaign: campaign,
          amount:
            quest.quest_spotify_playlists.points_for_track *
            quest.quest_spotify_playlists.tracks_count,
          kind: 1,
          statementable_type: 'QuestSpotifyPlaylist',
          balance: 0,
          statementable_id: quest.id,
          expiration_date: new Date(
            new Date().setDate(new Date().getDate() + 90),
          ),
          created_at: new Date(),
          updated_at: new Date(),
        });

        if (!userQuestSpotify.quest_spotify_playlists.question_2) {
          const accomplishedPromise = this.accomplishedQuestsRepository.save({
            quest: quest,
            user: user,
            created_at: new Date(),
            updated_at: new Date(),
          });

          const statementPromise = this.statementRepository.save({
            user: user,
            campaign: campaign,
            amount: quest.quest_spotify_playlists.points_for_question,
            kind: 1,
            statementable_type: 'Quest',
            balance: 0,
            statementable_id: quest.id,
            expiration_date: new Date(
              new Date().setDate(new Date().getDate() + 90),
            ),
            created_at: new Date(),
            updated_at: new Date(),
          });
          await Promise.all([statementPromise, accomplishedPromise]);
        }

        await this.userQuestSpotifyRepository.update(userQuestSpotify.id, {
          question_answered: true,
          complete: !userQuestSpotify.quest_spotify_playlists.question_2
            ? true
            : false,
          updated_at: new Date(),
        });
      }

      if (
        userQuestSpotify.question_answered &&
        userQuestSpotify.quest_spotify_playlists.question_2
      ) {
        await this.userQuestSpotifyRepository.update(userQuestSpotify.id, {
          complete: true,
          updated_at: new Date(),
        });

        const accomplishedPromise = this.accomplishedQuestsRepository.save({
          quest: quest,
          user: user,
          created_at: new Date(),
          updated_at: new Date(),
        });

        const statementPromise = this.statementRepository.save({
          user: user,
          campaign: campaign,
          amount: quest.quest_spotify_playlists.points_for_question_2,
          kind: 1,
          statementable_type: 'Quest',
          balance: 0,
          statementable_id: quest.id,
          expiration_date: new Date(
            new Date().setDate(new Date().getDate() + 90),
          ),
          created_at: new Date(),
          updated_at: new Date(),
        });
        await Promise.all([statementPromise, accomplishedPromise]);
      }
    }
    if (kind == 'spotify_listen_track') {
      const time = this.resolveTimeParam(query);

      try {
        await this.executeSpotifyListenTrackQuest(user, quest, campaign, time);
      } catch (e) {
        if (e instanceof TrackNotListenedError) {
          return {
            hasError: true,
            message: 'Faixa não ouvida',
          };
        }

        return {
          hasError: true,
          message: 'Erro ao executar missão',
        };
      }
    }

    return { hasError: false, message: 'ok' };
  }

  private async saveQuestAsExecuted(user: any, quest: any, campaign: any) {
    const accomplishedPromise = this.accomplishedQuestsRepository.save({
      quest: quest,
      user: user,
      created_at: new Date(),
      updated_at: new Date(),
    });
    const statementPromise = this.statementRepository.save({
      user: user,
      campaign: campaign,
      amount: quest.score,
      kind: 1,
      statementable_type: 'Quest',
      balance: 0,
      statementable_id: quest.id,
      expiration_date: new Date(new Date().setDate(new Date().getDate() + 90)),
      created_at: new Date(),
      updated_at: new Date(),
    });
    await Promise.all([accomplishedPromise, statementPromise]);
  }

  private async executeSpotifyListenTrackQuest(
    user: any,
    quest: any,
    campaign: any,
    time: any,
  ) {
    const questSpotify = await this.getQuestSpotify(quest);
    const recentlyPlayed = await this.getSpotifyRecentlyPlayed(user, time);

    if (!this.wasTrackListened(recentlyPlayed, questSpotify)) {
      throw new TrackNotListenedError("Track not listened.");
    }

    this.saveQuestAsExecuted(user, quest, campaign);
  }

  private async getQuestSpotify(quest: any): Promise<any> {
    return await this.questSpotifyRepository.findOne({
      where: { quest: quest },
    });
  }

  private async getSpotifyRecentlyPlayed(user: any, time: any): Promise<any[]> {
    const spotifyService = new SpotifyService();
    const response = await spotifyService.getRecentlyPlayed(
      user.credentials['refresh_token'],
      time,
    );
    return response && Array.isArray(response['items'])
      ? response['items']
      : [];
  }

  private wasTrackListened(recentlyPlayed: any[], questSpotify: any) {
    const foundTrack = recentlyPlayed.find((track: any) => {
      return track['track']['external_ids']['isrc'] == questSpotify.isrc;
    });
    return foundTrack ? true : false;
  }

  private resolveTimeParam(query: any) {
    if (!query || !("time" in query)) {
      return 0;
    }

    const time = query["time"];

    if (isNaN(time)) {
      return 0;
    }

    return time;
  }

  validateEmail(email) {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email.toLowerCase());
  }

  formatQuest(
    quests: Quest[],
    accomplished_quests: AccomplishedQuests[],
    userQuestSpotify: UserQuestSpotifyPlaylist[],
  ) {
    return quests.map((quest) => {
      return {
        id: quest.id,
        type: 'quests',
        kind: QuestMissionType[quest.kind],
        status: quest.status,
        date_start: quest.date_start,
        score: quest.score,
        completed: accomplished_quests?.find(
          (accomplished) => accomplished.quest.id === quest.id,
        )
          ? true
          : false,
        extra: this.getExtra(quest, userQuestSpotify),
      };
    });
  }

  getExtra(quest: Quest, userQuestSpotify: UserQuestSpotifyPlaylist[]) {
    switch (quest.kind) {
      case 0:
        return {
          kind: 'Spotify',
          id: quest.quest_spotifies.id,
          kind_spotify: 'artist',
          to_listen: false,
          uid: quest.quest_spotifies.uid,
          uri: quest.quest_spotifies.uri,
          name: quest.quest_spotifies.name,
        };
      case 1:
        return {
          kind: 'Spotify',
          id: quest.quest_spotifies.id,
          kind_spotify: 'playlist',
          to_listen: false,
          uid: quest.quest_spotifies.uid,
          uri: quest.quest_spotifies.uri,
          name: quest.quest_spotifies.name,
        };
      case 2:
        return {
          kind: 'Spotify',
          id: quest.quest_spotifies.id,
          kind_spotify: 'track',
          to_listen: false,
          uid: quest.quest_spotifies.uid,
          uri: quest.quest_spotifies.uri,
          name: quest.quest_spotifies.name,
        };
      case 3:
        return {
          kind: 'Spotify',
          id: quest.quest_spotifies.id,
          kind_spotify: 'album',
          to_listen: false,
          uid: quest.quest_spotifies.uid,
          uri: quest.quest_spotifies.uri,
          name: quest.quest_spotifies.name,
        };
      case 4:
        return {
          kind: 'Spotify',
          id: quest.quest_spotifies.id,
          kind_spotify: 'track',
          to_listen: true,
          uid: quest.quest_spotifies.uid,
          uri: quest.quest_spotifies.uri,
          name: quest.quest_spotifies.name,
        };
      case 5:
        return {
          kind: 'Question',
          id: quest.quest_questions.id,
          question: quest.quest_questions.question,
        };
      case 6:
        return {
          kind: 'Youtube',
          id: quest.quest_youtubes.id,
          kind_youtube: 'user',
          name: quest.quest_youtubes.name,
          url: quest.quest_youtubes.url,
          item_id: this.getYoutubeUserName(quest.quest_youtubes.url),
        };
      case 7:
        return {
          kind: 'Youtube',
          id: quest.quest_youtubes.id,
          kind_youtube: 'watch',
          name: quest.quest_youtubes.name,
          url: quest.quest_youtubes.url,
          item_id: this.getYoutubeId(quest.quest_youtubes.url),
        };
      case 10:
        return {
          kind: 'PreSave',
          id: quest.quest_pre_saves.id,
          launch_in: quest.quest_pre_saves.launch_in,
          name_artist: quest.quest_pre_saves.name_artist,
          name_product: quest.quest_pre_saves.name_product,
          uri: quest.quest_pre_saves.uri,
        };
      case 11:
        return {
          kind: 'Opt',
          id: quest.quest_opts.id,
          description: quest.quest_opts.description,
        };
      case 12:
        const userQuest = userQuestSpotify.find(
          (userQuest) =>
            userQuest.quest_spotify_playlists.id ==
            quest.quest_spotify_playlists.id,
        );

        return {
          kind: 'SpotifyPlaylist',
          id: quest.quest_spotify_playlists.id,
          completed: this.getSpotifyPlaylistStatus(userQuest),
          cover_url: quest.quest_spotify_playlists.cover_url,
          name: quest.quest_spotify_playlists.name,
          points_for_question:
            quest.quest_spotify_playlists.points_for_question,
          points_for_question_2:
            quest.quest_spotify_playlists.points_for_question_2,
          points_for_track: quest.quest_spotify_playlists.points_for_track,
          question: quest.quest_spotify_playlists.question,
          question_2: quest.quest_spotify_playlists.question_2,
          question_answered: userQuest?.question_answered,
          songs_heard: userQuest.tracks ? userQuest.tracks.split(';') : [],
          tracks_count: quest.quest_spotify_playlists.tracks_count,
          uri: quest.quest_spotify_playlists.uri,
        };
      default:
        return undefined;
    }
  }

  getSpotifyPlaylistStatus(userQuest: UserQuestSpotifyPlaylist) {
    if (!userQuest) return false;
    return userQuest.complete;
  }

  getYoutubeId(url: string) {
    let video_id = url.split('v=')[1];
    const ampersandPosition = video_id.indexOf('&');
    if (ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id;
  }

  getYoutubeUserName(url: string) {
    let user_id = url.split('user/')[1] || url.split('channel/')[1];
    const ampersandPosition = user_id?.indexOf('?');
    if (ampersandPosition != -1) {
      user_id = user_id.substring(0, ampersandPosition);
    }
    return user_id;
  }

  isActiveQuest(quest) {
    return !quest.deleted && quest.status;
  }

  async isQuestAlreadyAccomplishedAsync(user, quest) {
    const accomplishedQuest = await this.accomplishedQuestsRepository.findOne({
      where: {
        quest: quest,
        user: user,
      },
    });
    return accomplishedQuest ? true : false;
  }
}
