import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { DatabaseModule } from 'src/database/database.module';
import { settingsProviders } from 'src/providers/settings.providers';
import { campaignProviders } from 'src/providers/campaign.providers';
import { StorageService } from 'src/utils/storage/storage.service';
import { activeStorageBlobProviders } from 'src/providers/active-storage-blob.providers';
import { activeStorageAttachmentProviders } from 'src/providers/active-storage-attachment.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SettingController],
  providers: [
    ...settingsProviders,
    ...campaignProviders,
    ...activeStorageBlobProviders,
    ...activeStorageAttachmentProviders,
    SettingService,
    StorageService,
  ],
})
export class SettingModule {}
