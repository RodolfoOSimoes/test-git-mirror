import { Controller, Get } from '@nestjs/common';
import { CampaignService } from './campaign.service';

@Controller('v1/app/campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Get('banner')
  getBanner() {
    return this.campaignService.getBanner();
  }

  @Get('active')
  getActiveCampaigns() {
    return this.campaignService.getActiveCampaigns();
  }
}
