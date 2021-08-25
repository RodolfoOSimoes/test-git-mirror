import { Connection } from 'typeorm';
import { Extract } from '../entities/extract.entity';

export const extractProviders = [
  {
    provide: 'EXTRACT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Extract),
    inject: ['DATABASE_CONNECTION'],
  },
];
