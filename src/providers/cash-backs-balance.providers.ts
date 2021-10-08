import { CashBackBalance } from 'src/entities/cash-backs-balance.entity';
import { Connection } from 'typeorm';

export const cashBackBalanceProviders = [
  {
    provide: 'CASH_BACK_BALANCE_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(CashBackBalance),
    inject: ['DATABASE_CONNECTION'],
  },
];
