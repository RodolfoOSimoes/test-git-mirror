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

@Controller('v1/backoffice/quests')
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createQuestDto: CreateQuestDto) {
    if (req.user.roles === AdminRole.MASTER)
      return this.questService.create(req.user.id, createQuestDto);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req, @Query('page') page: number) {
    if (req.user.roles === AdminRole.MASTER)
      return this.questService.findAll(page);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    if (req.user.roles === AdminRole.MASTER)
      return this.questService.findOne(id);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/users')
  findUsers(
    @Request() req,
    @Param('id') id: number,
    @Query('page') page: number,
  ) {
    if (req.user.roles === AdminRole.MASTER)
      return this.questService.findListUsers(id, page);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: number,
    @Body() updateQuestDto: UpdateQuestDto,
  ) {
    if (req.user.roles === AdminRole.MASTER)
      return this.questService.update(req.user.id, id, updateQuestDto);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: number) {
    if (req.user.roles === AdminRole.MASTER)
      return this.questService.remove(id);
    else throw new UnauthorizedException();
  }
}
