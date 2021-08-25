import { Connection } from 'typeorm';
import { Address } from '../entities/address.entity';

export const addressProviders = [
  {
    provide: 'ADDRESS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Address),
    inject: ['DATABASE_CONNECTION'],
  },
];
