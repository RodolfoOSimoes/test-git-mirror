import { Connection } from 'typeorm';
import { UserChallenge } from '../entities/user-challenges.entity';

export const userChallengeProviders = [
  {
    provide: 'USER_CHALLENGE_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(UserChallenge),
    inject: ['DATABASE_CONNECTION'],
  },
];
