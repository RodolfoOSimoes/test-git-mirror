import { Connection } from 'typeorm';
import { BadgeChallenge } from '../entities/badge-challenge.entity';

export const badgeChallengeProviders = [
  {
    provide: 'BADGE_CHALLENGE_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(BadgeChallenge),
    inject: ['DATABASE_CONNECTION'],
  },
];
