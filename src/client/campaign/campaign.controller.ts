import { Controller, Get } from '@nestjs/common';
import { CampaignService } from './campaign.service';

@Controller('v1/app/campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Get('banner')
  findBanner() {
    return this.campaignService.findBanner();
  }
}
