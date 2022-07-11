ALTER TABLE accomplished_quests
ADD COLUMN execution_date datetime NOT NULL AFTER quest_id;

DROP INDEX `index_accomplished_quests_on_user_id_and_quest_id` ON accomplished_quests;

UPDATE accomplished_quests
SET execution_date = created_at
WHERE id > 0 AND execution_date is null;
