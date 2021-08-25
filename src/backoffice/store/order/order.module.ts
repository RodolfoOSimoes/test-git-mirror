import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { orderProviders } from '../../../providers/order.providers';
import { DatabaseModule } from 'src/database/database.module';
import { ProductModule } from '../product/product.module';
import { UserModule } from 'src/backoffice/user/user.module';
import { PaginationService } from 'src/utils/pagination/pagination.service';

@Module({
  controllers: [OrderController],
  imports: [DatabaseModule, ProductModule, UserModule],
  providers: [...orderProviders, OrderService, PaginationService],
  exports: [OrderService, OrderModule],
})
export class OrderModule {}
