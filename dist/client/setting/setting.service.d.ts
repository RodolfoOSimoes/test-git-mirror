import { Campaign } from 'src/entities/campaign.entity';
import { Setting } from 'src/entities/setting.entity';
import { StorageService } from 'src/utils/storage/storage.service';
import { Repository } from 'typeorm';
export declare class SettingService {
    private settingsRepository;
    private campaignRepository;
    private storageService;
    constructor(settingsRepository: Repository<Setting>, campaignRepository: Repository<Campaign>, storageService: StorageService);
    findOne(): Promise<Setting>;
}
