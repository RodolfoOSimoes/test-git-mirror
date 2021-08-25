import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { regionProviders } from '../../providers/region.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...regionProviders],
  exports: [RegionModule],
})
export class RegionModule {}
