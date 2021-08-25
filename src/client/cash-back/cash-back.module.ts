import { Module } from '@nestjs/common';
import { CashBackService } from './cash-back.service';
import { CashBackController } from './cash-back.controller';
import { userProviders } from 'src/providers/user.providers';
import { cashBackProviders } from 'src/providers/cash-backs.providers';
import { DatabaseModule } from 'src/database/database.module';
import { rescueProviders } from 'src/providers/rescue.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CashBackController],
  providers: [
    ...userProviders,
    ...cashBackProviders,
    ...rescueProviders,
    CashBackService,
  ],
})
export class CashBackModule {}
