import {
  Controller,
  Get,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TransactionService } from './transaction.service';

@Controller('v1/app/transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    if (req.user.roles == 'spotify')
      return this.transactionService.findAll(req.user.id);
    throw new UnauthorizedException();
  }
}
