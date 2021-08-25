import { Connection } from 'typeorm';
import { RecentlyPlayeds } from '../entities/recently-playeds.entity';

export const recentlyPlayedsProviders = [
  {
    provide: 'RECENTLY_PLAYEDS_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(RecentlyPlayeds),
    inject: ['DATABASE_CONNECTION'],
  },
];
