import { Connection } from 'typeorm';
import { RescueCount } from '../entities/rescue-counts.entity';

export const rescueCountsProviders = [
  {
    provide: 'RESCUE_COUNT_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(RescueCount),
    inject: ['DATABASE_CONNECTION'],
  },
];
