import { Repository } from 'typeorm';
import { AdminService } from '../admin/admin.service';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Setting } from '../../entities/setting.entity';
export declare class SettingsService {
    private settingsRepository;
    private adminService;
    constructor(settingsRepository: Repository<Setting>, adminService: AdminService);
    findAll(): Promise<Setting>;
    update(id: number, data: UpdateSettingDto): Promise<{
        message: string;
    }>;
}
