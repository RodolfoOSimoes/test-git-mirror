import { Inject, Injectable } from '@nestjs/common';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Campaign } from '../../entities/campaign.entity';
import { StorageService } from 'src/utils/storage/storage.service';

@Injectable()
export class CampaignService {
  constructor(
    @Inject('CAMPAIGN_REPOSITORY')
    private campaignRepository: Repository<Campaign>,
    private storageService: StorageService,
  ) {}

  private static CAMPAIGN_IMAGE_KEYS = [
    'CampaignImage',
    'CampaignImageMedium',
    'CampaignImageSmall',
    'CampaignBanner',
  ];

  private async extendCampaigns(
    campaigns: any[],
    imageKeys: string[] = CampaignService.CAMPAIGN_IMAGE_KEYS,
  ) {
    const campaignRequests: any[] = campaigns.map(async (campaign) => {
      return await this.extendCampaign(campaign, imageKeys);
    });
    return await Promise.all(campaignRequests);
  }

  private async extendCampaign(
    campaign: any,
    imageKeys: string[] = CampaignService.CAMPAIGN_IMAGE_KEYS,
  ) {
    const imageRequests: Promise<any>[] = imageKeys.map(async (imageKey) => {
      const url: string = await this.storageService.getPicture(
        imageKey,
        campaign.id,
      );

      switch (imageKey) {
        case 'CampaignImage':
          campaign.image = url ? url : '';
          break;
        case 'CampaignImageMedium':
          campaign.imageMedium = url ? url : '';
          break;
        case 'CampaignImageSmall':
          campaign.imageSmall = url ? url : '';
          break;
        case 'CampaignBanner':
          campaign.banner = url ? url : '';
          break;
      }
    });

    await Promise.all(imageRequests);

    return campaign;
  }

  async getBanner() {
    const campaigns: any[] = await this.campaignRepository.find({
      order: { id: 'DESC' },
      where: {
        date_start: LessThanOrEqual(new Date()),
        date_finish: MoreThanOrEqual(new Date()),
        enable_banner: true,
        deleted: false,
      },
    });

    const extendedCampaigns: any[] = await this.extendCampaigns(campaigns, [
      'CampaignBanner',
    ]);

    return extendedCampaigns;
  }

  async getActiveCampaigns() {
    const campaigns: any[] = await this.campaignRepository.find({
      order: { id: 'DESC' },
      where: {
        date_start: LessThanOrEqual(new Date()),
        date_finish: MoreThanOrEqual(new Date()),
        status: true,
        deleted: false,
      },
    });

    const extendedCampaigns: any[] = await this.extendCampaigns(campaigns, [
      'CampaignImage',
      'CampaignImageMedium',
      'CampaignImageSmall',
    ]);

    return extendedCampaigns;
  }
}
