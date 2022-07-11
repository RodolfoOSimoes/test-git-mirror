import moment from 'moment';

import { getConnection } from 'src/jobs/workers/utils/database';
import { getExpirationDate } from 'src/jobs/workers/utils/statement';
import { epochToMomentLocalTz } from 'src/utils/date.utils';

export function getHistoryTimeRange(history: any): Date[] {
  return history.length
    ? [
        epochToMomentLocalTz(history[0].timestamp),
        epochToMomentLocalTz(history[history.length - 1].timestamp),
      ]
    : [];
}

function getUniqueTracks(history: any): any {
  const dict: any = {};
  return history.data.filter((activity) => {
    if (activity.type !== 'track') {
      return false;
    }

    if (
      dict[activity.id] &&
      epochToMomentLocalTz(dict[activity.id].timestamp).isSame(
        epochToMomentLocalTz(activity.timestamp),
        'day',
      )
    ) {
      return false;
    }

    return true;
  });
}

function findQuestOfTrack(quests: any[], track: any): any {
  return quests.find((quest: any) => parseInt(quest.uid) === track.id);
}

function isNotAccomplishedQuest(accomplishedQuests, quest, track): boolean {
  const trackDate: any = epochToMomentLocalTz(track.timestamp);
  return !accomplishedQuests.find(
    (accomplishedQuest: any) =>
      accomplishedQuest.quest_id === quest.id &&
      moment(accomplishedQuests.execution_date).isSame(trackDate, 'day'),
  );
}

async function loadActiveSpotifyTrackListeningQuests(
  user: any,
): Promise<any[]> {
  const connection: any = getConnection();

  if (!connection) {
    throw new Error('No database connection');
  }

  return await connection.query(
    `SELECT q.id, q.score, qs.uid FROM quests q
    INNER JOIN quest_spotifies qs ON qs.quest_id = q.id
    WHERE q.status = ? AND q.date_start < ? AND q.deleted = ? AND q.kind = ?
    ORDER BY date_start DESC`,
    [true, new Date(), false, 4],
  );
}

async function loadAccomplishedQuests(
  user: any,
  timeRange: any[],
): Promise<any[]> {
  const connection: any = getConnection();

  if (!connection) {
    throw new Error('No database connection');
  }

  const startDate: string = timeRange[0].format('YYYY-MM-DD 00:00:00');
  const endDate: string = timeRange[1].format('YYYY-MM-DD  23:59:59');

  return await connection.query(
    `SELECT id, quest_id, execution_date
    FROM accomplished_quests
    WHERE user_id = ? AND execution_date >= ? AND execution_date <= ?;`,
    [user.id, startDate, endDate],
  );
}

async function saveQuestAsExecuted(
  user: any,
  quest: any,
  track: any,
  campaign: any,
): Promise<void> {
  const connection: any = getConnection();

  if (!connection) {
    throw new Error('No database connection');
  }

  const now: Date = new Date();

  const accomplishedQuestsPromise: any = connection.query(
    `INSERT INTO accomplished_quests (
      user_id,
      quest_id,
      execution_date,
      created_at,
      updated_at)
    VALUES (?,?,?,?,?)`,
    [
      user.id,
      quest.id,
      epochToMomentLocalTz(track.timestamp).toDate(),
      now,
      now,
    ],
  );

  const statementsPromise: any = connection.query(
    ` INSERT INTO statements (
        user_id,
        campaign_id,
        amount,
        kind,
        balance,
        statementable_type,
        statementable_id,
        code_doc,
        statementable_type_action,
        expiration_date,
        deleted,
        created_at,
        updated_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      user.id,
      campaign ? campaign.id : null,
      quest.score,
      1,
      0,
      'Quest',
      quest.id,
      null,
      null,
      getExpirationDate(),
      0,
      now,
      now,
    ],
  );

  await Promise.all([accomplishedQuestsPromise, statementsPromise]);
}

export async function computeSpotifyTrackListeningQuests(
  user: any,
  history: any,
  campaign: any,
): Promise<void> {
  const cleanHistory: any[] = getUniqueTracks(history);

  const timeRange: any[] = getHistoryTimeRange(cleanHistory);
  const [quests, accomplishedQuests] = await Promise.all([
    loadActiveSpotifyTrackListeningQuests(user),
    loadAccomplishedQuests(user, timeRange),
  ]);

  if (quests.length) {
    cleanHistory.forEach((track: any) => {
      const quest: any = findQuestOfTrack(quests, track);
      if (quest && isNotAccomplishedQuest(accomplishedQuests, quest, track)) {
        saveQuestAsExecuted(user, quest, track, campaign);
      }
    });
  }
}
