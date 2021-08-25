import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DatabaseModule } from 'src/database/database.module';
import { productProviders } from 'src/providers/product.providers';
import { StorageService } from 'src/utils/storage/storage.service';
import { activeStorageBlobProviders } from 'src/providers/active-storage-blob.providers';
import { activeStorageAttachmentProviders } from 'src/providers/active-storage-attachment.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [
    ...productProviders,
    ...activeStorageBlobProviders,
    ...activeStorageAttachmentProviders,
    ProductService,
    StorageService,
  ],
})
export class ProductModule {}
