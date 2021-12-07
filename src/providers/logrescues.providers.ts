import { Connection } from 'typeorm';
import { LogRescues } from '../entities/logrescues.entity';

export const newsletterProviders = [
  {
    provide: 'LOGRESCUES_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(LogRescues),
    inject: ['DATABASE_CONNECTION'],
  },
];