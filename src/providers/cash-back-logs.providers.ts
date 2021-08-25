import { Connection } from 'typeorm';
import { CashBackLogs } from '../entities/cash-back-logs.entity';

export const cashBackLogsProviders = [
  {
    provide: 'CASH_BACK_LOGS_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(CashBackLogs),
    inject: ['DATABASE_CONNECTION'],
  },
];
