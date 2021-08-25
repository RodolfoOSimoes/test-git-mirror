import { Connection } from 'typeorm';
import { Withdrawal } from '../entities/withdrawals.entity';

export const withdrawalProviders = [
  {
    provide: 'WITHDRAWAL_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(Withdrawal),
    inject: ['DATABASE_CONNECTION'],
  },
];
