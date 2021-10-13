import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { QuestService } from './quest.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminRole } from 'src/enums/AdminRoles';
import { Put } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('v1/backoffice/quests')
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER)
  @Post()
  create(@Request() req, @Body() createQuestDto: CreateQuestDto) {
    return this.questService.create(req.user.id, createQuestDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER, AdminRole.PROMOTER)
  @Get()
  findAll(@Request() req, @Query('page') page: number) {
    return this.questService.findAll(page);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER, AdminRole.PROMOTER)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    return this.questService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER, AdminRole.PROMOTER)
  @Get(':id/users')
  findUsers(
    @Request() req,
    @Param('id') id: number,
    @Query('page') page: number,
  ) {
    return this.questService.findListUsers(id, page);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER)
  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: number,
    @Body() updateQuestDto: UpdateQuestDto,
  ) {
    return this.questService.update(req.user.id, id, updateQuestDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: number) {
    return this.questService.remove(id);
  }
}
