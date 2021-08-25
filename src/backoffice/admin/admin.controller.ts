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

  @UseGuards(JwtAuthGuard)
  @Post('admins')
  create(@Request() req, @Body() createAdminDto: CreateAdminDto) {
    if (req.user.roles === AdminRole.MASTER)
      return this.adminService.create(createAdminDto);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER)
  @Get('admins')
  findAll(@Request() req, @Query('page') page: number) {
    if (req.user.roles === AdminRole.MASTER)
      return this.adminService.findAll(page);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Get('admins/me')
  me(@Request() req) {
    if (req.user.roles === AdminRole.MASTER)
      return this.adminService.me(req.user.email);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Get('admins/:id')
  findOne(@Request() req, @Param('id') id: number) {
    if (req.user.roles === AdminRole.MASTER)
      return this.adminService.findOne(id);
    else throw new UnauthorizedException();
  }

  @Post('admins/forget_password')
  forgetPassword(@Request() req, @Body() createAdminDto: CreateAdminDto) {
    return this.adminService.forgetPassword(createAdminDto.admin.email);
  }

  @UseGuards(JwtAuthGuard)
  @Put('admins/:id')
  update(
    @Request() req,
    @Param('id') id: number,
    @Body() createAdminDto: CreateAdminDto,
  ) {
    if (req.user.roles === AdminRole.MASTER)
      return this.adminService.update(id, createAdminDto);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Put('admins')
  updateByToken(@Request() req, @Body() createAdminDto: CreateAdminDto) {
    if (req.user.roles === AdminRole.MASTER)
      return this.adminService.updateByToken(req.user.email, createAdminDto);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('admins')
  remove(@Request() req) {
    return this.adminService.remove(req.user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  updatePassword(@Request() req, @Body() dto: UpdateAdminProfileDto) {
    return this.adminService.updateProfile(req.user.id, dto);
  }
}
