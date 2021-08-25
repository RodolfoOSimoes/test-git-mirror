import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AdminModule } from 'src/backoffice/admin/admin.module';
import { DatabaseModule } from 'src/database/database.module';
import { productProviders } from '../../../providers/product.providers';
import { BadgeChallengeModule } from 'src/backoffice/badge-challenge/badge-challenge.module';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { StorageService } from 'src/utils/storage/storage.service';
import { activeStorageBlobProviders } from 'src/providers/active-storage-blob.providers';
import { activeStorageAttachmentProviders } from 'src/providers/active-storage-attachment.providers';

@Module({
  controllers: [ProductController],
  imports: [DatabaseModule, AdminModule, BadgeChallengeModule],
  providers: [
    ...productProviders,
    ...activeStorageBlobProviders,
    ...activeStorageAttachmentProviders,
    ProductService,
    PaginationService,
    StorageService,
  ],
  exports: [ProductModule, ProductService],
})
export class ProductModule {}
