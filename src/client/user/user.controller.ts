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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateTermsDto } from './dto/update-terms.dto';

@Controller('v1/app/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get('me')
  findOne(@Request() req) {
    if (req.user.roles == 'spotify')
      return this.userService.findOne(req.user.id);
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
