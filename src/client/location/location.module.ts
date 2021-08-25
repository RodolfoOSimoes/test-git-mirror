import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { DatabaseModule } from 'src/database/database.module';
import { stateProviders } from 'src/providers/state.providers';
import { cityProviders } from 'src/providers/city.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [LocationController],
  providers: [...stateProviders, ...cityProviders, LocationService],
})
export class LocationModule {}
