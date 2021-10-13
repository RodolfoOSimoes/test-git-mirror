import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { orderProviders } from '../../../providers/order.providers';
import { DatabaseModule } from 'src/database/database.module';
import { ProductModule } from '../product/product.module';
import { UserModule } from 'src/backoffice/user/user.module';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { adminProviders } from 'src/providers/admin.providers';
import { MfaService } from 'src/utils/mfa/mfa.service';
import { SendMailProducerService } from 'src/jobs/producers/sendMail-producer-service';
import { StatementService } from 'src/backoffice/statement/statement.service';
import { BullModule } from '@nestjs/bull';
import { statementProviders } from 'src/providers/statement.providers';
import { userProviders } from 'src/providers/user.providers';
import { productProviders } from 'src/providers/product.providers';
import { cashBackProviders } from 'src/providers/cash-backs.providers';
import { questProviders } from 'src/providers/quest.providers';
import { AdminService } from 'src/backoffice/admin/admin.service';

@Module({
  controllers: [OrderController],
  imports: [
    DatabaseModule,
    ProductModule,
    UserModule,
    BullModule.registerQueue({
      name: 'sendMail-queue',
    }),
  ],
  providers: [
    ...orderProviders,
    ...adminProviders,
    ...statementProviders,
    ...userProviders,
    ...productProviders,
    ...cashBackProviders,
    ...questProviders,
    AdminService,
    MfaService,
    SendMailProducerService,
    StatementService,
    OrderService,
    PaginationService,
  ],
  exports: [OrderService, OrderModule],
})
export class OrderModule {}
