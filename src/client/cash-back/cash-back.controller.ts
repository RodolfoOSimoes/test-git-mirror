import {
  Controller,
  Get,
  Param,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CashBackService } from './cash-back.service';

@Controller('v1/app/users/cash_backs')
export class CashBackController {
  constructor(private readonly cashBackService: CashBackService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    if (req.user.roles == 'spotify')
      return this.cashBackService.findAll(req.user.id);
    throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    if (req.user.roles == 'spotify') return this.cashBackService.findOne(id);
    throw new UnauthorizedException();
  }
}
