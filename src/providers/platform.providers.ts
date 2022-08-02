import { Connection } from 'typeorm';
import { Platform } from '../entities/platform.entity';

export const platformProviders = [
  {
    provide: 'PLATFORM_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Platform),
    inject: ['DATABASE_CONNECTION'],
  },
];
