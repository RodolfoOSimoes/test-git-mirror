import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { campaignProviders } from '../../providers/campaign.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AdminModule } from '../admin/admin.module';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { StorageService } from 'src/utils/storage/storage.service';
import { activeStorageBlobProviders } from 'src/providers/active-storage-blob.providers';
import { activeStorageAttachmentProviders } from 'src/providers/active-storage-attachment.providers';

@Module({
  controllers: [CampaignController],
  imports: [DatabaseModule, AdminModule],
  providers: [
    ...campaignProviders,
    ...activeStorageBlobProviders,
    ...activeStorageAttachmentProviders,
    CampaignService,
    PaginationService,
    StorageService,
  ],
  exports: [CampaignModule, CampaignService],
})
export class CampaignModule {}
