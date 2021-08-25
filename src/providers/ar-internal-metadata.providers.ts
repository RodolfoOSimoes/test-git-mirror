import { Connection } from 'typeorm';
import { ArInternalMetadata } from '../entities/ar-internal-metadata.entity';

export const arInternalMetadataProviders = [
  {
    provide: 'AR_INTERNAL_METADATA_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(ArInternalMetadata),
    inject: ['DATABASE_CONNECTION'],
  },
];
