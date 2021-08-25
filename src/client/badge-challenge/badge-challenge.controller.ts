import {
  Controller,
  Get,
  Request,
  Param,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BadgeChallengeService } from './badge-challenge.service';

@Controller('v1/app/badge_challenges')
export class BadgeChallengeController {
  constructor(private readonly badgeChallengeService: BadgeChallengeService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    if (req.user.roles == 'spotify')
      return this.badgeChallengeService.findAll();
    throw new UnauthorizedException();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    if (req.user.roles == 'spotify')
      return this.badgeChallengeService.findOne(id);
    throw new UnauthorizedException();
  }
}
