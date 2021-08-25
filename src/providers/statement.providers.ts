import { Connection } from 'typeorm';
import { Statement } from '../entities/statement.entity';

export const statementProviders = [
  {
    provide: 'STATEMENT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Statement),
    inject: ['DATABASE_CONNECTION'],
  },
];
