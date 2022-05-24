import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { campaignProviders } from '../../providers/campaign.providers';
import { DatabaseModule } from 'src/database/database.module';
import { StorageService } from 'src/utils/storage/storage.service';
import { activeStorageBlobProviders } from 'src/providers/active-storage-blob.providers';
import { activeStorageAttachmentProviders } from 'src/providers/active-storage-attachment.providers';

@Module({
  controllers: [CampaignController],
  imports: [DatabaseModule],
  providers: [
    ...campaignProviders,
    ...activeStorageBlobProviders,
    ...activeStorageAttachmentProviders,
    CampaignService,
    StorageService,
  ],
})
export class CampaignModule {}
