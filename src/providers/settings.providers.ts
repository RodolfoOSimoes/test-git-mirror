import { Connection } from 'typeorm';
import { Setting } from '../entities/setting.entity';

export const settingsProviders = [
  {
    provide: 'SETTINGS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Setting),
    inject: ['DATABASE_CONNECTION'],
  },
];
