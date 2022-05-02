import { Inject, Injectable } from '@nestjs/common';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Campaign } from '../../entities/campaign.entity';

@Injectable()
export class CampaignService {
  constructor(
    @Inject('CAMPAIGN_REPOSITORY')
    private campaignRepository: Repository<Campaign>,
  ) {}

  async findBanner() {
    return await this.campaignRepository.find({
      order: { id: 'DESC' },
      where: {
        date_start: LessThanOrEqual(new Date()),
        date_finish: MoreThanOrEqual(new Date()),
        status: true,
        enable_banner: true,
        deleted: false,
      },
    });
  }
}
