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
} from '@nestjs/common';
import { UserGratificationService } from './user-gratification.service';
import { CreateUserGratificationDto } from './dto/create-user-gratification.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminRole } from 'src/enums/AdminRoles';

@Controller('v1/backoffice/gratifications')
export class UserGratificationController {
  constructor(
    private readonly userGratificationService: UserGratificationService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Request() req,
    @Body() createUserGratificationDto: CreateUserGratificationDto,
  ) {
    if (req.user.roles === AdminRole.MASTER)
      return this.userGratificationService.create(
        req.user.id,
        createUserGratificationDto,
      );
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Request() req, @Query('id') id: number) {
    if (req.user.roles === AdminRole.MASTER)
      return this.userGratificationService.delete(id);
    else throw new UnauthorizedException();
  }
}
