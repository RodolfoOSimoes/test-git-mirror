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

  async loadBanner() {
    const campaigns: any[] = await this.campaignRepository.find({
      order: { id: 'DESC' },
      where: {
        date_start: LessThanOrEqual(new Date()),
        date_finish: MoreThanOrEqual(new Date()),
        status: true,
        enable_banner: true,
        deleted: false,
      },
    });

    const pictureLoadingPromises: any = campaigns.map(async (campaign) => {
      const picture: any = await this.storageService.getPicture(
        'CampaignBanner',
        campaign.id,
      );
      return {
        campaign,
        picture,
      };
    });

    const banner: any[] = await Promise.all(pictureLoadingPromises);

    return await banner;
  }
}
