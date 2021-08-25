import { Connection } from 'typeorm';
import { AccountProvider } from '../entities/account-provider.entity';

export const AccountProviderProviders = [
  {
    provide: 'ACCOUNT_PROVIDER_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(AccountProvider),
    inject: ['DATABASE_CONNECTION'],
  },
];
