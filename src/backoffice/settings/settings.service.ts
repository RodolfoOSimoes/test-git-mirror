import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AdminService } from '../admin/admin.service';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Setting } from '../../entities/setting.entity';

@Injectable()
export class SettingsService {
  constructor(
    @Inject('SETTINGS_REPOSITORY')
    private settingsRepository: Repository<Setting>,
    private adminService: AdminService,
  ) {}

  async findAll() {
    return await this.settingsRepository.findOne();
  }

  async update(id: number, data: UpdateSettingDto) {
    const setting = await this.settingsRepository.findOne();
    if (setting) {
      data.setting.admin = await this.adminService.findById(id);
      this.settingsRepository.update(setting.id, data.setting);
      return { message: 'Setting atualizada com sucesso!' };
    }
    return { message: 'Setting não encontrada!' };
  }
}
