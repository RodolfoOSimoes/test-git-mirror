import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  UnauthorizedException,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminRole } from 'src/enums/AdminRoles';
import { BadgeChallengeService } from './badge-challenge.service';
import { CreateBadgeChallengeDto } from './dto/create-badge-challenge.dto';
import { UpdateBadgeChallengeDto } from './dto/update-badge-challenge.dto';

@Controller('v1/backoffice/badge_challenges')
export class BadgeChallengeController {
  constructor(private readonly badgeChallengeService: BadgeChallengeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Request() req,
    @Body() createBadgeChallengeDto: CreateBadgeChallengeDto,
  ) {
    if (req.user.roles === AdminRole.MASTER)
      return this.badgeChallengeService.create(
        req.user.id,
        createBadgeChallengeDto,
      );
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req, @Query('page') page: number) {
    if (req.user.roles === AdminRole.MASTER)
      return this.badgeChallengeService.findAll(page);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    if (req.user.roles === AdminRole.MASTER)
      return this.badgeChallengeService.findOne(id);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: number,
    @Body() updateBadgeChallengeDto: UpdateBadgeChallengeDto,
  ) {
    if (req.user.roles === AdminRole.MASTER)
      return this.badgeChallengeService.update(
        req.user.id,
        id,
        updateBadgeChallengeDto,
      );
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: number) {
    if (req.user.roles === AdminRole.MASTER)
      return this.badgeChallengeService.remove(id);
    else throw new UnauthorizedException();
  }
}
