import { QuestPreSaves } from 'src/entities/quest-pre-saves.entity';
import { Connection } from 'typeorm';

export const questPreSavesProviders = [
  {
    provide: 'QUEST_PRE_SAVES_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(QuestPreSaves),
    inject: ['DATABASE_CONNECTION'],
  },
];
