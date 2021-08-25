import { Connection } from 'typeorm';
import { CashBack } from '../entities/cash-backs.entity';

export const cashBackProviders = [
  {
    provide: 'CASH_BACK_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(CashBack),
    inject: ['DATABASE_CONNECTION'],
  },
];
