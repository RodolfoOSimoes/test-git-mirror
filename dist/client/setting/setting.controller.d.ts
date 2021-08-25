import { SettingService } from './setting.service';
export declare class SettingController {
    private readonly settingService;
    constructor(settingService: SettingService);
    findOne(): Promise<import("../../entities/setting.entity").Setting>;
}
