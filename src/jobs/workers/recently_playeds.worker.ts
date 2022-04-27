/* eslint-disable @typescript-eslint/no-var-requires */
import { DeezerService } from 'src/apis/deezer/deezer.service';
import { breakArray } from 'src/utils/array.utils';
import { formatDate, epochToDate } from 'src/utils/date.utils';
import { createConnection } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

require('dotenv').config();

const UPDATE_INTERVAL: number = 5000; // 5 segundos
const MAX_USERS_BY_OPERATION: number = 30;
const CALLS_BY_SECOND: number = 10;

let dbConnection: any = null;
let deezerService: DeezerService = null;

async function getConnection() {
  return await createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.js}'],
    synchronize: false,
    logging: ['error'],
    extra: {
      connectionLimit: 20,
    },
  });
}

async function openDBConnection() {
  dbConnection = await getConnection();
}

function instantiateDeezerService() {
  deezerService = new DeezerService();
}

async function getUsersBatchForUpdate() {
  let users: Array<any> = [];

  try {
    users = await dbConnection.query(
      `SELECT id, credentials, last_heard ` +
        `FROM users ` +
        `WHERE have_accepted = ? ` +
        `AND deleted = ? ` +
        `AND situation = ? ` +
        `AND provider = ? ` +
        `ORDER BY last_deezer_history_check ASC ` +
        `LIMIT ?`,
      [true, false, false, 'deezer', MAX_USERS_BY_OPERATION],
    );
  } catch (e) {
    return [];
  }

  return users;
}

async function workerInfiniteLoop() {
  const users: Array<any> = await getUsersBatchForUpdate();
  const usersGroupedBySecond: Array<Array<any>> = breakArray(
    users,
    CALLS_BY_SECOND,
  );

  usersGroupedBySecond.forEach((group, i) => {
    setTimeout(() => {
      group.forEach((user) => {
        processUserRecentlyPlayed(user);
      });
    }, i * 1000);
  });
}

async function runWorker() {
  await openDBConnection();
  instantiateDeezerService();

  setInterval(workerInfiniteLoop, UPDATE_INTERVAL);

  console.log('Worker running...');
}

async function processUserRecentlyPlayed(user): Promise<void> {
  let history: any = null;
  try {
    const response: any = await deezerService.history(
      user.credentials['token'],
    );
    history = response.data;
  } catch (error) {
    return;
  }

  const recently: any = filterRecentlyPlayedOnly(user, history);

  if (recently.total > 0) {
    const [questPlaylistSpotify, campaign, rescues] = await Promise.all([
      loadSpotifyPlaylistQuests(dbConnection),
      loadCampaign(dbConnection),
      loadRescues(dbConnection),
    ]);

    console.log(`Updating data for user: ${user.id}`);

    // TODO: review.
    // await prepareCashbacks(
    //   user,
    //   rescues,
    //   recently,
    //   campaign,
    //   questPlaylistSpotify,
    //   dbConnection,
    // );
    // await updateUser(user, recently, dbConnection);
    // await saveRecentlyPlaylist(user, recently, dbConnection);
  }
}

function filterRecentlyPlayedOnly(user: any, history: any): any {
  if (user.last_heard === null) {
    return history;
  }

  const lastHeardDate: Date = new Date(user.last_heard);
  const lastHeardTimestamp: number = Math.trunc(lastHeardDate.getTime() / 1000);

  const filteredData: Array<any> = [];
  history.data.find((item) => {
    if (item.timestamp <= lastHeardTimestamp) {
      return true;
    }

    filteredData.push(item);
  });

  return {
    data: filteredData,
    total: filteredData.length,
  };
}

function parseTracks(tracks: string | null): Number[] {
  return tracks ? tracks.split(';').map((value) => parseInt(value)) : [];
}

async function loadSpotifyPlaylistQuests(connection) {
  const quests = await connection.query(
    `SELECT q.*, qsp.* FROM quests q
    INNER JOIN quest_spotify_playlists qsp
    ON qsp.quest_id = q.id
    WHERE q.status = ? AND q.date_start < ?
    AND q.deleted = ? AND q.kind = ? ORDER BY date_start DESC`,
    [true, new Date(), false, 12],
  );

  const questSpotifyPlaylist = [];

  quests.forEach((quest) => {
    if (quest) {
      questSpotifyPlaylist.push({
        id: quest.id,
        uri: quest.uri,
        tracks_count: quest.tracks_count,
        points_for_track: quest.points_for_track,
        tracks: parseTracks(quest.tracks),
        quest_id: quest.quest_id,
      });
    }
  });

  return questSpotifyPlaylist;
}

async function loadCampaign(connection) {
  const [campaign] = await connection.query(
    'SELECT id FROM campaigns WHERE status = ? AND date_start <= ? AND date_finish >= ?',
    [true, formatDate(new Date()), formatDate(new Date())],
  );

  return campaign;
}

async function loadRescues(connection) {
  const rescues = await connection.query(
    'SELECT * FROM rescues WHERE deleted = ? AND status = ? ORDER BY priority ASC, id DESC',
    [false, true],
  );
  return rescues;
}

function getToday() {
  return moment(new Date()).format('YYYY-MM-DD');
}

function getLimits(cashbacks, rescues) {
  const uniqueCashbacks = [];

  cashbacks.forEach((cashback) => {
    const cb = uniqueCashbacks.find((cb) => cb.track_id === cashback.track_id);
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

async function getBonusForCashback(connection, cashbackLimits, user) {
  const allowedCashBack = cashbackLimits.filter(
    (cashback) => cashback.limit > 0,
  );
  if (allowedCashBack.length == 0) {
    try {
      const [result] = await connection.query(
        'SELECT limited_gratification_score AS gratification FROM settings LIMIT 1',
      );

      const expirationDate = new Date(
        new Date().setDate(new Date().getDate() + 90),
      );

      const today = moment(new Date()).utcOffset('-0300').format('YYYY-MM-DD');

      const statement = await connection.query(
        `SELECT * FROM statements WHERE user_id = ? AND
         DATE(CONVERT_TZ(created_at, 'UTC', 'America/Sao_Paulo')) = ? AND
         statementable_type = 'UserGratification' LIMIT 1`,
        [user.id, today],
      );

      if (statement?.length == 0) {
        await connection.query(
          `INSERT INTO statements (
        user_id,
        campaign_id,
        amount,
        kind,
        balance,
        statementable_type,
        statementable_id,
        deleted,
        created_at,
        updated_at,
        code_doc,
        statementable_type_action,
        expiration_date) VALUES (
          ?,?,?,?,?,?,?,?,?,?,?,?,?
        )`,
          [
            user.id,
            null,
            result.gratification,
            1,
            0,
            'UserGratification',
            user.id,
            0,
            new Date(),
            new Date(),
            null,
            null,
            expirationDate,
          ],
        );
      }
    } catch (error) {
      console.error('Erro ao salvar Gratificação: ', error.message);
    }
  }
}

async function loadUserQuestSpotifyPlaylists(
  user,
  questSpotifyPlaylist,
  connection,
) {
  try {
    if (!questSpotifyPlaylist || !questSpotifyPlaylist.length) {
      return [];
    }

    const questIds = questSpotifyPlaylist.map((qsp) => qsp.id);
    const userQuest = await connection.query(
      `SELECT uqsp.id AS id, uqsp.isrcs AS isrcs, qsp.id AS qsp_id
    FROM user_quest_spotify_playlists uqsp
    INNER JOIN quest_spotify_playlists qsp ON uqsp.quest_spotify_playlist_id = qsp.id
    WHERE qsp.id IN (?) AND uqsp.user_id = ?`,
      [questIds, user.id],
    );
    return userQuest;
  } catch (error) {
    return [];
  }
}

async function prepareCashbacks(
  user,
  rescues,
  recently,
  campaign,
  questPlaylistSpotify,
  connection,
) {
  const todayCashBacks = await connection.query(
    `SELECT * FROM cash_backs WHERE user_id = ? AND played_at >= ? ORDER BY track_id DESC`,
    [user.id, moment(new Date()).utcOffset('-0300').format('YYYY-MM-DD')],
  );

  const cashbacksLimit = getLimits(todayCashBacks, rescues);

  await getBonusForCashback(connection, cashbacksLimit, user);

  const userQuestSpotify = await loadUserQuestSpotifyPlaylists(
    user,
    questPlaylistSpotify,
    connection,
  );

  const userQuestPlaylist = [];

  const statementCashbacks = [];

  const rescuesCampaign = [];

  recently.data.forEach((item) => {
    if (item.type !== 'track') {
      return;
    }

    questPlaylistSpotify.forEach((qsp) => {
      if (qsp.tracks.includes(item.id)) {
        const userQuest = userQuestSpotify.find((uqs) => uqs.qsp_id == qsp.id);
        const filteredUserQuest = userQuestPlaylist.find(
          (uqp) => uqp.playlist_id == qsp.id,
        );
        if (!userQuest && !filteredUserQuest) {
          userQuestPlaylist.push({
            tracks: [item.id],
            playlist_id: qsp.id,
            playlist: qsp,
            id: null,
            user: user,
          });
        } else if (
          filteredUserQuest &&
          !filteredUserQuest.tracks.includes(item.id)
        ) {
          filteredUserQuest.tracks = [...filteredUserQuest.tracks, item.id];
        } else if (!filteredUserQuest && userQuest) {
          userQuestPlaylist.push({
            tracks: !userQuest.tracks.includes(item.id)
              ? [...userQuest.tracks, item.id]
              : [...userQuest.tracks],
            playlist_id: qsp.id,
            playlist: qsp,
            id: userQuest.id,
            user: user,
          });
        }
      }
    });

    const rescueList = process.env.RESCUES_CAMPAIGN
      ? process.env.RESCUES_CAMPAIGN.split(';')
      : [];
    if (rescueList.includes(item.id)) {
      rescuesCampaign.push({
        uri: item.id,
        date: getToday(),
        name: item.title,
        user_id: user.id,
        created_at: new Date(),
        updated_at: new Date(),
        played_at: epochToDate(item.timestamp),
      });
    }

    // const isrc = item['track']['external_ids']['isrc'];
    // const rescue = rescues.find((rescue) => rescue.isrc == isrc);
    // const todayCashback = cashbacksLimit.find((cb) => cb.track_id == item.id);
    // if (rescue && todayCashback && todayCashback.limit > 0) {
    //   todayCashback.limit--;
    //   statementCashbacks.push({
    //     user_id: user.id,
    //     rescue_id: rescue,
    //     track_id: item.id,
    //     played_at: epochToDate(item.timestamp),
    //     name: item.title,
    //     score: rescue.score,
    //   });
    // }
  });

  const userQuestSpotifySave = [];
  const userQuestSpotifyUpdate = [];

  userQuestPlaylist.forEach((uqp) => {
    if (uqp.id) {
      userQuestSpotifyUpdate.push({
        updated_at: new Date(),
        isrcs: uqp.isrcs,
        id: uqp.id,
      });
    } else {
      userQuestSpotifySave.push({
        updated_at: new Date(),
        isrcs: uqp.isrcs,
        user: user,
        quest_spotify_playlists: uqp.playlist,
        created_at: new Date(),
        complete: false,
        question_answered: false,
      });
    }
  });

  const statements = [];
  const cashbacks = [];

  statementCashbacks.forEach((cashback) => {
    cashbacks.push(buildCashBack(cashback, user));
    statements.push(buildStatement(cashback, user, campaign));
  });

  try {
    await Promise.all([
      saveStatements(statements, connection),
      saveCashBacks(cashbacks, connection),
      saveUserQuestSpotify(userQuestSpotifySave, connection),
      saveRescueCampaign(rescuesCampaign, connection),
    ]);
    await updateUserQuestSpotify(userQuestSpotifyUpdate, connection);
  } catch (error) {
    console.log(error.message);
  }
}

async function saveRescueCampaign(rescuesCampaign, connection) {
  for (const rescue of rescuesCampaign) {
    await connection.query(
      `INSERT INTO rescue_records (
        user_id,
        uri,
        name,
        date,
        played_at,
        created_at,
        updated_at) VALUES (
          ?,?,?,?,?,?,?
        )`,
      [
        rescue.user_id,
        rescue.uri,
        rescue.name,
        rescue.date,
        rescue.played_at,
        rescue.created_at,
        rescue.updated_at,
      ],
    );
  }
}

async function saveStatements(statements, connection) {
  for (const statement of statements) {
    await connection.query(
      `INSERT INTO statements (
        user_id,
        campaign_id,
        amount,
        kind,
        balance,
        statementable_type,
        statementable_id,
        deleted,
        created_at,
        updated_at,
        code_doc,
        statementable_type_action,
        expiration_date) VALUES (
          ?,?,?,?,?,?,?,?,?,?,?,?,?
        )`,
      [
        statement.user?.id,
        statement.campaign?.id,
        statement.amount,
        statement.kind,
        statement.balance,
        statement.statementable_type,
        statement.statementable_id,
        statement.deleted,
        statement.created_at,
        statement.updated_at,
        statement.code_doc,
        statement.statementable_type_action,
        statement.expiration_date,
      ],
    );
  }
}

async function saveCashBacks(cashbacks, connection) {
  for (const cashback of cashbacks) {
    await connection.query(
      `INSERT INTO cash_backs (
        user_id,
        track_id,
        played_at,
        name,
        rescue_id,
        deleted,
        created_at,
        updated_at
      ) VALUES (
        ?,?,?,?,?,?,?,?
      )`,
      [
        cashback.user?.id,
        cashback.track_id,
        cashback.played_at,
        cashback.name,
        cashback.rescue?.id,
        cashback.deleted,
        cashback.created_at,
        cashback.updated_at,
      ],
    );
  }
}

async function saveUserQuestSpotify(userQuestSpotifies, connection) {
  for (const uqs of userQuestSpotifies) {
    await connection.query(
      `INSERT INTO user_quest_spotify_playlists (
        user_id,
        quest_spotify_playlist_id,
        complete,
        question_answered,
        isrcs,
        created_at,
        updated_at
      ) VALUES (
        ?,?,?,?,?,?,?
      )`,
      [
        uqs.user?.id,
        uqs.quest_spotify_playlists?.id,
        uqs.complete,
        uqs.question_answered,
        uqs.isrcs,
        uqs.created_at,
        uqs.updated_at,
      ],
    );
  }
}

async function updateUserQuestSpotify(userQuestSpotifies, connection) {
  for (const uqs of userQuestSpotifies) {
    await connection.query(
      `UPDATE user_quest_spotify_playlists SET isrcs = ?, updated_at = ? WHERE id = ?`,
      [uqs.isrcs, uqs.updated_at, uqs.id],
    );
  }
}

function buildCashBack(cb: any, user) {
  return {
    user: user,
    track_id: cb.track_id,
    played_at: cb.played_at,
    name: cb.name,
    rescue: cb.rescue_id,
    deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
  };
}

function buildStatement(cb: any, user, campaign) {
  return {
    user: user,
    campaign: campaign,
    amount: cb.score,
    kind: 1,
    statementable_type: 'CashBack',
    balance: 0,
    statementable_id: cb.rescue_id.id,
    deleted: false,
    code_doc: null,
    statementable_type_action: null,
    expiration_date: new Date(new Date().setDate(new Date().getDate() + 90)),
    created_at: new Date(),
    updated_at: new Date(),
  };
}

async function updateUser(user, recently, connection) {
  const now: Date = new Date();
  await connection.query(
    `UPDATE users ` +
      `SET last_time_verified = ?, ` +
      `last_heard = ?, ` +
      `updated_at = ?, ` +
      `last_deezer_history_check = ? ` +
      `WHERE id = ?`,
    [new Date().getTime(), getLastHeardTime(recently), now, now, user.id],
  );
}

async function saveRecentlyPlaylist(user, recently, connection) {
  const now = new Date();
  const listen_times = recently.total;
  await connection.query(
    `INSERT INTO recently_playeds (
    user_id, content, listen_times, checked_in, created_at, updated_at) VALUES
    (?, ?, ?, ?, ?, ?)`,
    [user.id, JSON.stringify(recently), listen_times, now, now, now],
  );
}

function getLastHeardTime(recently): Date {
  if (recently.total <= 0) {
    throw Error('One or more recent activity is expected.');
  }

  const last: any = recently.data[0];
  const lastHeardTime: Date = epochToDate(last.timestamp);

  return lastHeardTime;
}

function prepareRecentlyPlayed(recently: any) {
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
          uri: item.track.uri,
          id: item.track.id,
          duration_ms: item.track.duration_ms,
          name: item.track.name,
          artists: item.track.artists,
        },
      };
    }),
  };
}

(async () => {
  await runWorker();
})();
