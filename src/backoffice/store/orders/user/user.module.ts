import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { orderProviders } from '../../../../providers/order.providers';
import { userProviders } from '../../../../providers/user.providers';
import { AdminModule } from 'src/backoffice/admin/admin.module';
import { DatabaseModule } from 'src/database/database.module';
import { PaginationService } from 'src/utils/pagination/pagination.service';

@Module({
  controllers: [UserController],
  imports: [DatabaseModule, AdminModule],
  providers: [
    ...orderProviders,
    ...userProviders,
    UserService,
    PaginationService,
  ],
})
export class UserModule {}
