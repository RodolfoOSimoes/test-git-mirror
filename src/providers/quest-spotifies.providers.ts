import { QuestSpotifies } from 'src/entities/quest-spotifies.entity';
import { Connection } from 'typeorm';

export const questSpotifiesProviders = [
  {
    provide: 'QUEST_SPOTIFIES_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(QuestSpotifies),
    inject: ['DATABASE_CONNECTION'],
  },
];
