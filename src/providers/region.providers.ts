import { Connection } from 'typeorm';
import { Region } from '../entities/region.entity';

export const regionProviders = [
  {
    provide: 'REGION_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Region),
    inject: ['DATABASE_CONNECTION'],
  },
];
