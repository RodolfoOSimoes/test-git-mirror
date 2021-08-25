import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { cityProviders } from '../../providers/city.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...cityProviders],
  exports: [CityModule],
})
export class CityModule {}
