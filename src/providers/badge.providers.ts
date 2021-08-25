import { Connection } from 'typeorm';
import { Badge } from '../entities/badge.entity';

export const badgeProviders = [
  {
    provide: 'BADGE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Badge),
    inject: ['DATABASE_CONNECTION'],
  },
];
