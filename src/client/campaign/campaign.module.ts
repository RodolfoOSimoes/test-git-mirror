import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { campaignProviders } from '../../providers/campaign.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [CampaignController],
  imports: [DatabaseModule],
  providers: [
    ...campaignProviders,
    CampaignService,
  ],
})
export class CampaignModule {}
