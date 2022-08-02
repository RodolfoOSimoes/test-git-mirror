import { Connection } from 'typeorm';
import { UserPlatform } from '../entities/user-platform.entity';

export const userPlatformProviders = [
  {
    provide: 'USER_PLATFORM_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(UserPlatform),
    inject: ['DATABASE_CONNECTION'],
  },
];
