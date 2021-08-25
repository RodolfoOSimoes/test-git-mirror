import { Connection } from 'typeorm';
import { FriendlyIdSlug } from '../entities/friendly-id-slugs.entity';

export const friendlyIdSlugProviders = [
  {
    provide: 'FRIENDLY_ID_SLUG_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(FriendlyIdSlug),
    inject: ['DATABASE_CONNECTION'],
  },
];
