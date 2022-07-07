import { getConnection } from 'src/jobs/workers/utils/database';
import { hasTrackOnHistory } from 'src/jobs/workers/utils/deezer';
import { getExpirationDate } from 'src/jobs/workers/utils/statement';

async function loadPendingSpotifyTrackListeningQuests(
  user: any,
): Promise<any[]> {
  const connection: any = getConnection();

  if (!connection) {
    throw new Error('No database connection');
  }

  return await connection.query(
    `SELECT q.*, qs.* FROM quests q
    INNER JOIN quest_spotifies qs ON qs.quest_id = q.id
    LEFT JOIN accomplished_quests ac ON ac.quest_id = q.id AND ac.user_id = ?
    WHERE q.status = ? AND q.date_start < ? AND q.deleted = ? AND q.kind = ? AND ac.id IS NULL
    ORDER BY date_start DESC`,
    [user.id, true, new Date(), false, 4],
  );
}

async function saveQuestAsExecuted(
  user: any,
  quest: any,
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
      created_at,
      updated_at
    )
    VALUES (?,?,?,?)`,
    [user.id, quest.id, now, now],
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
  const quests: any[] = await loadPendingSpotifyTrackListeningQuests(user);
  quests.forEach((quest: any) => {
    if (hasTrackOnHistory(history, quest.uid)) {
      saveQuestAsExecuted(user, quest, campaign);
    }
  });
}
