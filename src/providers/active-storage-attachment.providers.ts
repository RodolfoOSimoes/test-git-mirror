import { Connection } from 'typeorm';
import { ActiveStorageAttachment } from '../entities/active_storage_attachment.entity';

export const activeStorageAttachmentProviders = [
  {
    provide: 'ACTIVE_STORAGE_ATTACHMENT_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(ActiveStorageAttachment),
    inject: ['DATABASE_CONNECTION'],
  },
];
