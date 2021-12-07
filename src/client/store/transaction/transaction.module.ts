import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/providers/user.providers';
import { statementProviders } from 'src/providers/statement.providers';
import { addressProviders } from 'src/providers/address.providers';
import { orderProviders } from 'src/providers/order.providers';
import { productProviders } from 'src/providers/product.providers';
import { SendMailProducerService } from 'src/jobs/producers/sendMail-producer-service';
import { BullModule } from '@nestjs/bull';
import { withdrawalProviders } from 'src/providers/withdrawal.providers';
import { campaignProviders } from 'src/providers/campaign.providers';
import { logrescuesProviders } from 'src/providers/logrescues.providers';
import { LogrescueService } from './logrescue.service';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'sendMail-queue',
    }),
  ],
  controllers: [TransactionController],
  providers: [
    ...userProviders,
    ...statementProviders,
    ...addressProviders,
    ...orderProviders,
    ...productProviders,
    ...withdrawalProviders,
    ...campaignProviders,
    TransactionService,
    SendMailProducerService,
    ...logrescuesProviders,
    LogrescueService
  ],
})
export class TransactionModule {}
