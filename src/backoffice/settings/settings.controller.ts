import {
  Controller,
  Get,
  Body,
  Put,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminRole } from 'src/enums/AdminRoles';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('v1/backoffice/settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.settingsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER)
  @Put()
  create(@Request() req, @Body() data: UpdateSettingDto) {
    return this.settingsService.update(req.user.id, data);
  }
}
