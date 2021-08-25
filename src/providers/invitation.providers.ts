import { Connection } from 'typeorm';
import { Invitation } from '../entities/invitations.entity';

export const invitationProviders = [
  {
    provide: 'INVITATION_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(Invitation),
    inject: ['DATABASE_CONNECTION'],
  },
];
