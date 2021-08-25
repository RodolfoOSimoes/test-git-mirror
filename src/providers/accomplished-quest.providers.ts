import { Connection } from 'typeorm';
import { AccomplishedQuests } from '../entities/accomplished-quest.entity';

export const accomplishedQuestProviders = [
  {
    provide: 'ACCOMPLISHED_QUEST_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(AccomplishedQuests),
    inject: ['DATABASE_CONNECTION'],
  },
];
