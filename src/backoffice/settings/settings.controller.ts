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

@Controller('v1/backoffice/settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    if (req.user.roles === AdminRole.MASTER)
      return this.settingsService.findAll();
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  create(@Request() req, @Body() data: UpdateSettingDto) {
    if (req.user.roles === AdminRole.MASTER)
      return this.settingsService.update(req.user.id, data);
    else throw new UnauthorizedException();
  }
}
