import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminRole } from 'src/enums/AdminRoles';
import { UserService } from './user.service';

@Controller('v1/backoffice/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Request() req,
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('query') query: string,
  ) {
    if (req.user.roles === AdminRole.MASTER)
      return this.userService.findAll(page, size, query);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    if (req.user.roles === AdminRole.MASTER)
      return this.userService.findOne(id);
    else throw new UnauthorizedException();
  }
}
