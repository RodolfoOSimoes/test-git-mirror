/* eslint-disable @typescript-eslint/no-var-requires */
import { SpotifyService } from 'src/apis/spotify/spotify.service';
import { formatDate } from 'src/utils/date.utils';
import { createConnection } from 'typeorm';

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
      connectionLimit: 40,
    },
  });
}

async function runWorker() {
  const rescueList = process.env.RESCUES_CAMPAIGN
    ? process.env.RESCUES_CAMPAIGN.split(';')
    : [];
  let connection = null;
  const spotifyService = new SpotifyService();
  connection = await getConnection();
  let iteration = 119146;
  const limit = 1;
  // while (true) {
  setInterval(async () => {
    try {
      console.log('Starting worker');

      const usersData = await connection.query(
        `SELECT id, credentials, last_heard FROM users WHERE have_accepted = ? AND deleted = ? AND situation = ? AND last_time_verified < ? AND id = ? LIMIT ${limit}`,
        [true, false, false, new Date().getTime(), iteration],
      );
      console.log(usersData);

      if (!usersData.length) {
        iteration = 0;
      } else {
        iteration = usersData[usersData.length - 1].id;
      }
      const users = await getUsers(usersData, connection);
      await prepareJob(users, connection, spotifyService, rescueList);
    } catch (error) {
      console.log(error);
    }
  }, 120000);
}
// }

async function prepareJob(users, connection, spotifyService, rescueList) {
  await Promise.all([
    runJob(users.splice(0, 15), connection, spotifyService, rescueList),
    runJob(users.splice(0, 15), connection, spotifyService, rescueList),
  ]);
}

async function runJob(users, connection, spotifyService, rescueList) {
  try {
    for (const user of users) {
      // console.log(`Processing user: ${user.id}`);
      const credentials = user.credentials;

      let recentlyPlayeds = null;

      try {
        recentlyPlayeds = await spotifyService.getRecentlyPlayed(
          credentials['refresh_token'],
          user.lastTimeVerify,
        );
      } catch (error) {
        recentlyPlayeds = null;
      }

      if (recentlyPlayeds) {
        const recently = prepareRecentlyPlayed(recentlyPlayeds);

        if (recently) {
          // console.log(`Updating data for user: ${user.id}`);
          const [questPlaylistSpotify, campaign, rescues] = await Promise.all([
            loadSpotifyPlaylistQuests(connection),
            loadCampaign(connection),
            loadRescues(connection),
          ]);

          await prepareCashbacks(
            user,
            rescues,
            recentlyPlayeds,
            campaign,
            questPlaylistSpotify,
            connection,
            rescueList,
          );
          await updateUser(user, recently, connection);
        }
      }
      // console.log(`Finish processing user: ${user.id}`);
    }
  } catch (error) {
    console.log(error);
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
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - 1}`;
}

function getToday() {
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
  // try {
  //   const questIds = questSpotifyPlaylist.map((qsp) => qsp.id) || null;
  //   const userQuest = await connection.query(
  //     `SELECT uqsp.id AS id, uqsp.isrcs AS isrcs, qsp.id AS qsp_id
  //   FROM user_quest_spotify_playlists uqsp
  //   INNER JOIN quest_spotify_playlists qsp ON uqsp.quest_spotify_playlist_id = qsp.id
  //   WHERE qsp.id IN (?) AND uqsp.user_id = ?`,
  //     [questIds || null, user.id],
  //   );
  //   return userQuest;
  // } catch (error) {
  return [];
  // }
}

async function prepareCashbacks(
  user,
  rescues,
  recently,
  campaign,
  questPlaylistSpotify,
  connection,
  rescueList,
) {
  const todayCashBacks = await connection.query(
    `SELECT * FROM cash_backs WHERE user_id = ? AND played_at > ? ORDER BY track_id DESC`,
    [user.id, getToday()],
  );

  const cashbacksLimit = getLimits(todayCashBacks, rescues);

  const userQuestSpotify = await loadUserQuestSpotifyPlaylists(
    user,
    questPlaylistSpotify,
    connection,
  );

  const userQuestPlaylist = [];

  const statementCashbacks = [];

  const rescuesCampaign = [];

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
        console.log(item['track']['id']);
        if ('6nTUAzQDgyD9BJkXKWWPxM' == item['track']['id']) {
          rescuesCampaign.push({
            uri: item['track']['id'],
            date: getToday(),
            name: item['track']['name'],
            user_id: user.id,
            created_at: new Date(),
            updated_at: new Date(),
            played_at: item['played_at'],
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
  console.log(rescuesCampaign);
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
  // console.log('finishing worker');
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
