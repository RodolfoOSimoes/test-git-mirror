import {
  Controller,
  Get,
  Param,
  UseGuards,
  Query,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AdminRole } from 'src/enums/AdminRoles';
import { UserService } from './user.service';

@Controller('v1/backoffice/store/orders/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER, AdminRole.PROMOTER)
  @Get('list')
  findAll(
    @Request() req,
    @Query('page') page: number,
    @Query('query') query: string,
  ) {
    return this.userService.findAll(page, query);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER, AdminRole.PROMOTER)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    return this.userService.findOne(id);
  }
}
