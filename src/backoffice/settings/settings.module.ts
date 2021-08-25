import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { settingsProviders } from '../../providers/settings.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [DatabaseModule, AdminModule],
  controllers: [SettingsController],
  providers: [...settingsProviders, SettingsService],
})
export class SettingsModule {}
