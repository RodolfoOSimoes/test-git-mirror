import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseModule } from 'src/database/database.module';
import { orderProviders } from 'src/providers/order.providers';
import { userProviders } from 'src/providers/user.providers';
import { StorageService } from 'src/utils/storage/storage.service';
import { activeStorageBlobProviders } from 'src/providers/active-storage-blob.providers';
import { activeStorageAttachmentProviders } from 'src/providers/active-storage-attachment.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [
    ...orderProviders,
    ...userProviders,
    ...activeStorageBlobProviders,
    ...activeStorageAttachmentProviders,
    OrderService,
    StorageService,
  ],
})
export class OrderModule {}
