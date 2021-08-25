import { Connection } from 'typeorm';
import { Admin } from '../entities/admin.entity';

export const adminProviders = [
  {
    provide: 'ADMIN_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Admin),
    inject: ['DATABASE_CONNECTION'],
  },
];
