import { PreSaveUser } from 'src/entities/pre-save-users.entity';
import { Connection } from 'typeorm';

export const preSaveUsersProviders = [
  {
    provide: 'PRE_SAVE_USER_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(PreSaveUser),
    inject: ['DATABASE_CONNECTION'],
  },
];
