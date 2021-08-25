import { Connection } from 'typeorm';
import { LogSession } from '../entities/log-session.entity';

export const logSessionProviders = [
  {
    provide: 'LOG_SESSION_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(LogSession),
    inject: ['DATABASE_CONNECTION'],
  },
];
