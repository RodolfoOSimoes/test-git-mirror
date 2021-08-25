import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { DatabaseModule } from 'src/database/database.module';
import { addressProviders } from 'src/providers/address.providers';
import { userProviders } from 'src/providers/user.providers';
import { cityProviders } from 'src/providers/city.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AddressController],
  providers: [
    ...addressProviders,
    ...userProviders,
    ...cityProviders,
    AddressService,
  ],
})
export class AddressModule {}
