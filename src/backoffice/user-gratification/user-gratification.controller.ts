import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  UnauthorizedException,
  Query,
  Delete,
  Param,
  ForbiddenException,
} from '@nestjs/common';
import { UserGratificationService } from './user-gratification.service';
import { CreateUserGratificationDto } from './dto/create-user-gratification.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminRole } from 'src/enums/AdminRoles';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('v1/backoffice/gratifications')
export class UserGratificationController {
  constructor(
    private readonly userGratificationService: UserGratificationService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER)
  @Post()
  create(
    @Request() req,
    @Body() createUserGratificationDto: CreateUserGratificationDto,
  ) {
    return this.userGratificationService.create(
      req.user.id,
      createUserGratificationDto,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER)
  @Delete(':id')
  delete(@Request() req, @Param('id') id: number) {
    return this.userGratificationService.delete(id);
  }
}
