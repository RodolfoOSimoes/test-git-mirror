import { Connection } from 'typeorm';
import { ActiveStorageBlob } from '../entities/active_storage_blobs.entity';

export const activeStorageBlobProviders = [
  {
    provide: 'ACTIVE_STORAGE_BLOB_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(ActiveStorageBlob),
    inject: ['DATABASE_CONNECTION'],
  },
];
