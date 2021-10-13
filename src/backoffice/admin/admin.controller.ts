import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Request,
  UseGuards,
  UnauthorizedException,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AdminRole } from 'src/enums/AdminRoles';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminProfileDto } from './dto/update-profile.dto';

@Controller('v1/backoffice')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER)
  @Post('admins')
  create(@Request() req, @Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER, AdminRole.ADMIN, AdminRole.PROMOTER)
  @Get('admins')
  findAll(@Request() req, @Query('page') page: number) {
    return this.adminService.findAll(page);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    AdminRole.MASTER,
    AdminRole.ADMIN,
    AdminRole.PROMOTER,
    AdminRole.LOGISTIC,
  )
  @Get('admins/me')
  me(@Request() req) {
    return this.adminService.me(req.user.email);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER, AdminRole.ADMIN, AdminRole.PROMOTER)
  @Get('admins/:id')
  findOne(@Request() req, @Param('id') id: number) {
    return this.adminService.findOne(id);
  }

  @Post('admins/forget_password')
  forgetPassword(@Request() req, @Body() createAdminDto: CreateAdminDto) {
    return this.adminService.forgetPassword(createAdminDto.admin.email);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER)
  @Put('admins/:id')
  update(
    @Request() req,
    @Param('id') id: number,
    @Body() createAdminDto: CreateAdminDto,
  ) {
    return this.adminService.update(id, createAdminDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER)
  @Put('admins')
  updateByToken(@Request() req, @Body() createAdminDto: CreateAdminDto) {
    return this.adminService.updateByToken(req.user.email, createAdminDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER)
  @Delete('admins')
  remove(@Request() req) {
    return this.adminService.remove(req.user.email);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    AdminRole.MASTER,
    AdminRole.ADMIN,
    AdminRole.LOGISTIC,
    AdminRole.PROMOTER,
  )
  @Put('profile')
  updatePassword(@Request() req, @Body() dto: UpdateAdminProfileDto) {
    return this.adminService.updateProfile(req.user.id, dto);
  }
}
