import {
  Controller,
  Post,
  Request,
  UseGuards,
  UnauthorizedException,
  Param,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
import { TransactionService } from './transaction.service';

@Controller('v1/app/store/transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @UseGuards(JwtAuthGuard)
  @Post('sale/:code')
  create(@Request() req, @Param('code') code: string) {
    initializeTransactionalContext();
    if (req.user.roles == 'spotify')
      return this.transactionService.create(req.user.id, code);
    throw new UnauthorizedException();
  }
}
