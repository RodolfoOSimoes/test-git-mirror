import { Connection } from 'typeorm';
import { Rescue } from '../entities/rescue.entity';

export const rescueProviders = [
  {
    provide: 'RESCUE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Rescue),
    inject: ['DATABASE_CONNECTION'],
  },
];
