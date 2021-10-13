import { Module } from '@nestjs/common';
import { StatementService } from './statement.service';
import { StatementController } from './statement.controller';
import { DatabaseModule } from 'src/database/database.module';
import { statementProviders } from '../../providers/statement.providers';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { userProviders } from 'src/providers/user.providers';
import { productProviders } from 'src/providers/product.providers';
import { cashBackProviders } from 'src/providers/cash-backs.providers';
import { questProviders } from 'src/providers/quest.providers';
import { AdminService } from '../admin/admin.service';
import { adminProviders } from 'src/providers/admin.providers';
import { MfaService } from 'src/utils/mfa/mfa.service';
import { SendMailProducerService } from 'src/jobs/producers/sendMail-producer-service';
import { BullModule } from '@nestjs/bull';

@Module({
  controllers: [StatementController],
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'sendMail-queue',
    }),
  ],
  providers: [
    ...statementProviders,
    ...userProviders,
    ...productProviders,
    ...cashBackProviders,
    ...questProviders,
    ...adminProviders,
    MfaService,
    SendMailProducerService,
    StatementService,
    PaginationService,
    AdminService,
  ],
})
export class StatementModule {}
