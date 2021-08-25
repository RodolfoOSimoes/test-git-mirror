import { Connection } from 'typeorm';
import { State } from '../entities/state.entity';

export const stateProviders = [
  {
    provide: 'STATE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(State),
    inject: ['DATABASE_CONNECTION'],
  },
];
