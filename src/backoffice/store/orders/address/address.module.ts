import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AdminModule } from 'src/backoffice/admin/admin.module';
import { addressProviders } from '../../../../providers/address.providers';
import { cityProviders } from '../../../../providers/city.providers';
import { UserModule } from 'src/backoffice/user/user.module';

@Module({
  imports: [DatabaseModule, AdminModule, UserModule],
  controllers: [AddressController],
  providers: [...cityProviders, ...addressProviders, AddressService],
})
export class AddressModule {}
