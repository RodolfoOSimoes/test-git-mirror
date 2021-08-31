/* eslint-disable @typescript-eslint/no-var-requires */
import { SpotifyService } from 'src/apis/spotify/spotify.service';
import { CashBack } from 'src/entities/cash-backs.entity';
import { Statement } from 'src/entities/statement.entity';
import { UserQuestSpotifyPlaylist } from 'src/entities/user-quest-spotify-playlists.entity';
import { formatDate } from 'src/utils/date.utils';
import { createConnection } from 'typeorm';
const Queue = require('bull');
require('dotenv').config();

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
      connectionLimit: 2,
    },
  });
}

async function runWorker() {
  let connection = null;
  const spotifyService = new SpotifyService();
  try {
    console.log('Starting worker');
    const queue = new Queue('recently_playeds_queue', process.env.REDIS_URL);
    connection = await getConnection();

    await queue.process(async (job) => {
      const usersData = job.data;

      try {
        const users = await getUsers(usersData, connection);

        for (const user of users) {
          console.log(`Processing user: ${user.id}`);
          const credentials = user.credentials;

          const recentlyPlayeds = await spotifyService.getRecentlyPlayed(
            credentials['refresh_token'],
            user.lastTimeVerify,
          );
          const recently = prepareRecentlyPlayed(recentlyPlayeds);
          if (recently) {
            const [questPlaylistSpotify, campaign, rescues] = await Promise.all(
              [
                loadSpotifyPlaylistQuests(connection),
                loadCampaign(connection),
                loadRescues(connection),
              ],
            );

            await prepareCashbacks(
              user,
              rescues,
              recentlyPlayeds,
              campaign,
              questPlaylistSpotify,
              connection,
            );
            await updateUser(user, recently, connection);
          }
          console.log(`Finish processing user: ${user.id}`);
        }

        connection.close();
      } catch (error) {}
    });
  } catch (error) {
    console.log(error);
    if (connection) connection.close();
  }
}

async function getUsers(queueUsers, connection) {
  const users = [];
  for (const userData of queueUsers) {
    const [recently] = await connection.query(
      `SELECT content FROM recently_playeds WHERE user_id = ? ORDER BY created_at DESC`,
      [userData.id],
    );
    try {
      userData.lastTimeVerify = recently.content['cursors']['after'];
    } catch (error) {
      userData.lastTimeVerify = 0;
    }
    users.push(userData);
  }

  return users;
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
        isrcs: quest.isrcs,
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

function getYesterday() {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
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

async function loadUserQuestSpotifyPlaylists(
  user,
  questSpotifyPlaylist,
  connection,
) {
  const questIds = questSpotifyPlaylist.map((qsp) => qsp.id);
  const userQuest = await connection.query(
    `SELECT uqsp.id AS id, uqsp.isrcs AS isrcs, qsp.id AS qsp_id
    FROM user_quest_spotify_playlists uqsp 
    INNER JOIN quest_spotify_playlists qsp ON uqsp.quest_spotify_playlist_id = qsp.id
    WHERE qsp.id IN (?) AND uqsp.user_id = ?`,
    [questIds, user.id],
  );
  return userQuest;
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
    `SELECT * FROM cash_backs WHERE user_id = ? AND played_at > ? ORDER BY track_id DESC`,
    [user.id, getYesterday()],
  );

  const cashbacksLimit = getLimits(todayCashBacks, rescues);

  const userQuestSpotify = await loadUserQuestSpotifyPlaylists(
    user,
    questPlaylistSpotify,
    connection,
  );

  const userQuestPlaylist = [];

  const statementCashbacks = [];

  recently.items.forEach((item) => {
    const isrc = item['track']['external_ids']['isrc'];
    const rescue = rescues.find((rescue) => rescue.isrc == isrc);
    const todayCashback = cashbacksLimit.find(
      (cb) => cb.track_id == item['track']['id'],
    );

    questPlaylistSpotify.forEach((qsp) => {
      if (qsp.isrcs.includes(isrc)) {
        const userQuest = userQuestSpotify.find((uqs) => uqs.qsp_id == qsp.id);

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
        } else if (!filteredUserQuest && userQuest) {
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

  const userQuestSpotifySave = [];
  const userQuestSpotifyUpdate = [];

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
      userQuestSpotify.complete = false;
      userQuestSpotify.question_answered = false;
      userQuestSpotifySave.push(userQuestSpotify);
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
    ]);
    await updateUserQuestSpotify(userQuestSpotifyUpdate, connection);
  } catch (error) {
    console.log(error.message);
  }
  console.log('finishing worker');
}

async function saveStatements(statements, connection) {
  console.log('save statements start');
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
  console.log('save statements finish');
}
async function saveCashBacks(cashbacks, connection) {
  console.log('save cashbacks start');

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
  console.log('save cashbacks finish');
}
async function saveUserQuestSpotify(userQuestSpotifies, connection) {
  console.log('save userquest start');

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
  console.log('save userquest finish');
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

function buildStatement(cb: any, user, campaign) {
  const statement = new Statement();
  statement.user = user;
  statement.campaign = campaign;
  statement.amount = cb.score;
  statement.kind = 1;
  statement.statementable_type = 'CashBack';
  statement.balance = 0;
  statement.statementable_id = cb.rescue_id.id;
  statement.deleted = false;
  statement.code_doc = null;
  statement.statementable_type_action = null;
  statement.expiration_date = new Date(
    new Date().setDate(new Date().getDate() + 90),
  );
  statement.created_at = new Date();
  statement.updated_at = new Date();
  return statement;
}

async function updateUser(user, recently, connection) {
  await connection.query(
    `UPDATE users SET last_time_verified = ?, last_heard = ?, updated_at = ? WHERE id = ?`,
    [new Date().getTime(), getLastHeardTime(recently), new Date(), user.id],
  );

  await saveRecentlyPlaylist(user, recently, connection);
}

async function saveRecentlyPlaylist(user, recently, connection) {
  const now = new Date();
  const listen_times = recently?.items?.length || 0;
  await connection.query(
    `INSERT INTO recently_playeds (
    user_id, content, listen_times, checked_in, created_at, updated_at) VALUES
    (?, ?, ?, ?, ?, ?)`,
    [user.id, JSON.stringify(recently), listen_times, now, now, now],
  );
}

function getLastHeardTime(recently) {
  return new Date(recently?.items[recently?.items?.length - 1]?.played_at);
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
          duration_ms: item.track.duration_ms,
          name: item.track.name,
        },
      };
    }),
  };
}

(async () => {
  await runWorker();
})();
