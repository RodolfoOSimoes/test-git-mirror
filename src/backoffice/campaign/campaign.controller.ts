import { Put, Query } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminRole } from 'src/enums/AdminRoles';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

@Controller('v1/backoffice/campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createCampaignDto: CreateCampaignDto) {
    if (req.user.roles === AdminRole.MASTER)
      return this.campaignService.create(req.user.id, createCampaignDto);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req, @Query('page') page: number) {
    if (req.user.roles === AdminRole.MASTER)
      return this.campaignService.findAll(page);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    if (req.user.roles === AdminRole.MASTER)
      return this.campaignService.findOne(id);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: number,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ) {
    if (req.user.roles === AdminRole.MASTER)
      return this.campaignService.update(req.user.id, id, updateCampaignDto);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: number) {
    if (req.user.roles === AdminRole.MASTER)
      return this.campaignService.remove(id);
    else throw new UnauthorizedException();
  }

  // Não está sendo utilizado
  // @UseGuards(JwtAuthGuard)
  // @Get('/calendar')
  // calendar(@Request() req) {
  //   if (req.user.roles === AdminRole.MASTER)
  //     return this.campaignService.calendar();
  //   else throw new UnauthorizedException();
  // }
}
