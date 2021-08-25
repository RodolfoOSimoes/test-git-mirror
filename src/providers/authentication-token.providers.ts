import { Connection } from 'typeorm';
import { AuthenticationToken } from '../entities/authentication-token.entity';

export const authenticationTokenProviders = [
  {
    provide: 'AUTHENTICATION_TOKEN_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(AuthenticationToken),
    inject: ['DATABASE_CONNECTION'],
  },
];
