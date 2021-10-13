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
  Put,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AdminRole } from 'src/enums/AdminRoles';
import { BadgeChallengeService } from './badge-challenge.service';
import { CreateBadgeChallengeDto } from './dto/create-badge-challenge.dto';
import { UpdateBadgeChallengeDto } from './dto/update-badge-challenge.dto';

@Controller('v1/backoffice/badge_challenges')
export class BadgeChallengeController {
  constructor(private readonly badgeChallengeService: BadgeChallengeService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER)
  @Post()
  create(
    @Request() req,
    @Body() createBadgeChallengeDto: CreateBadgeChallengeDto,
  ) {
    return this.badgeChallengeService.create(
      req.user.id,
      createBadgeChallengeDto,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER, AdminRole.PROMOTER)
  @Get()
  findAll(@Request() req, @Query('page') page: number) {
    return this.badgeChallengeService.findAll(page);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER, AdminRole.PROMOTER)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    return this.badgeChallengeService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER)
  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: number,
    @Body() updateBadgeChallengeDto: UpdateBadgeChallengeDto,
  ) {
    return this.badgeChallengeService.update(
      req.user.id,
      id,
      updateBadgeChallengeDto,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: number) {
    return this.badgeChallengeService.remove(id);
  }
}
