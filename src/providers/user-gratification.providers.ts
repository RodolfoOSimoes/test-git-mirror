import { Connection } from 'typeorm';
import { UserGratification } from '../entities/user-gratification.entity';

export const userGratificationProviders = [
  {
    provide: 'USER_GRATIFICATION_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(UserGratification),
    inject: ['DATABASE_CONNECTION'],
  },
];
