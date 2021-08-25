import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { activeStorageAttachmentProviders } from 'src/providers/active-storage-attachment.providers';
import { activeStorageBlobProviders } from 'src/providers/active-storage-blob.providers';
import { StorageService } from './storage.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...activeStorageBlobProviders,
    ...activeStorageAttachmentProviders,
    StorageService,
  ],
  exports: [StorageService, StorageModule],
})
export class StorageModule {}
