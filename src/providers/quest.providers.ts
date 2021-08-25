import { Connection } from 'typeorm';
import { Quest } from '../entities/quest.entity';

export const questProviders = [
  {
    provide: 'QUEST_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Quest),
    inject: ['DATABASE_CONNECTION'],
  },
];
