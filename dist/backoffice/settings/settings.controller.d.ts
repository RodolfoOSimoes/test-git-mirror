import { SettingsService } from './settings.service';
import { UpdateSettingDto } from './dto/update-setting.dto';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    findAll(req: any): Promise<import("../../entities/setting.entity").Setting>;
    create(req: any, data: UpdateSettingDto): Promise<{
        message: string;
    }>;
}
