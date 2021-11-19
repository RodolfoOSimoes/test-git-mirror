import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { RescueService } from './rescue.service';
import { CreateRescueDto } from './dto/create-rescue.dto';
import { UpdateRescueDto } from './dto/update-rescue.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminRole } from 'src/enums/AdminRoles';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('v1/backoffice/rescues')
export class RescueController {
  constructor(private readonly rescueService: RescueService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER)
  @Post()
  create(@Request() req, @Body() createRescueDto: CreateRescueDto) {
    return this.rescueService.create(req.user.id, createRescueDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER, AdminRole.PROMOTER)
  @Get()
  findAll(@Request() req, @Query('page') page: number) {
    return this.rescueService.findAll(page);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER, AdminRole.PROMOTER)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    return this.rescueService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER, AdminRole.PROMOTER)
  @Get(':id/users')
  findUsers(
    @Request() req,
    @Param('id') id: number,
    @Query('page') page: number,
  ) {
    return this.rescueService.findUsers(id, page);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER, AdminRole.PROMOTER)
  @Get(':id/cash_backs')
  findCashBacksByDay(
    @Request() req,
    @Param('id') id: number,
    @Query('page') page: number,
  ) {
    return this.rescueService.findCashBacksByDay(id, page);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER, AdminRole.PROMOTER)
  @Get(':id/total_streams_cash_backs')
  findTotalStreamsCashBacks(
    @Request() req,
    @Param('id') id: number,
  ) {
    return this.rescueService.findTotalStreamsCashBacks(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER)
  @Post(':id/users')
  exportUsers(@Request() req, @Param('id') id: number) {
    return this.rescueService.exportUsers(req.user.id, id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER)
  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: number,
    @Body() updateRescueDto: UpdateRescueDto,
  ) {
    return this.rescueService.update(req.user.id, id, updateRescueDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: number) {
    return this.rescueService.remove(id);
  }
}
