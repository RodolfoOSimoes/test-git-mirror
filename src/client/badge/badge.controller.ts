import {
  Controller,
  Get,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BadgeService } from './badge.service';

@Controller('/v1/app/users/badges')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  findOne(@Request() req) {
    if (req.user.roles == 'spotify')
      return this.badgeService.findOne(req.user.id);
    throw new UnauthorizedException();
  }
}
