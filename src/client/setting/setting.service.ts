import { Inject, Injectable } from '@nestjs/common';
import { Campaign } from 'src/entities/campaign.entity';
import { Setting } from 'src/entities/setting.entity';
import { StorageService } from 'src/utils/storage/storage.service';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Repository } from 'typeorm';
import { formatDate } from 'src/utils/date.utils';

@Injectable()
export class SettingService {
  constructor(
    @Inject('SETTINGS_REPOSITORY')
    private settingsRepository: Repository<Setting>,
    @Inject('CAMPAIGN_REPOSITORY')
    private campaignRepository: Repository<Campaign>,
    private storageService: StorageService,
  ) {}

  async findOne() {
    const setting = await this.settingsRepository.findOne();
    setting.uri_playlist = setting.uri_playlist.split(':')[2];

    const campaign = await this.campaignRepository.findOne({
      status: true,
      date_start: LessThanOrEqual(formatDate(new Date())),
      date_finish: MoreThanOrEqual(formatDate(new Date())),
    });

    if (campaign) {
      const image = await this.storageService.getPicture(
        'Campaign',
        campaign.id,
      );

      setting['campaign'] = {
        date_finish: campaign.date_finish,
        date_start: campaign.date_start,
        id: campaign.id,
        image: image,
        name: campaign.name,
        slug: campaign.slug,
        status: campaign.status,
      };
    }

    delete setting.created_at;
    delete setting.updated_at;

    return setting;
  }
}
