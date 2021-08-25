import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { campaignProviders } from '../../providers/campaign.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AdminModule } from '../admin/admin.module';
import { PaginationService } from 'src/utils/pagination/pagination.service';

@Module({
  controllers: [CampaignController],
  imports: [DatabaseModule, AdminModule],
  providers: [...campaignProviders, CampaignService, PaginationService],
  exports: [CampaignModule, CampaignService],
})
export class CampaignModule {}
