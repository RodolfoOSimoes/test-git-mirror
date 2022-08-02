import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateTermsDto } from './dto/update-terms.dto';
import { Roles } from 'src/auth/decorators/client.decorator';
import { ClientGuard } from 'src/auth/guards/client.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ClientRole } from 'src/enums/ClientRoles';

@Controller('v1/app/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, ClientGuard)
  @Roles(ClientRole.DEEZER, ClientRole.YOUTUBE)
  @Get('me')
  findOne(@Request() req) {
    return this.userService.findOne(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/store')
  store(@Request() req) {
    if (req.user.roles == 'spotify') return this.userService.store(req.user.id);
    throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  updateUser(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    if (req.user.roles == 'spotify')
      return this.userService.update(req.user.id, updateUserDto);
    throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Put('accept')
  updateTerms(@Request() req, @Body() updateTerms: UpdateTermsDto) {
    if (req.user.roles == 'spotify')
      return this.userService.updateTerms(req.user.id, updateTerms);
    throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  remove(@Request() req) {
    if (req.user.roles == 'spotify')
      return this.userService.remove(req.user.id);
    throw new UnauthorizedException();
  }
}
