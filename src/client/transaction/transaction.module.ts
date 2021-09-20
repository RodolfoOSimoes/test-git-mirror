import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/providers/user.providers';
import { extractProviders } from 'src/providers/extract.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TransactionController],
  providers: [...userProviders, ...extractProviders, TransactionService],
})
export class TransactionModule {}
