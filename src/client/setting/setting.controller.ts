import { Controller, Get } from '@nestjs/common';
import { SettingService } from './setting.service';

@Controller('v1/app/settings')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}
  @Get()
  findOne() {
    return this.settingService.findOne();
  }
}
