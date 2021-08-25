import { Module } from '@nestjs/common';
import { RescueService } from './rescue.service';
import { RescueController } from './rescue.controller';
import { rescueProviders } from '../../providers/rescue.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AdminModule } from '../admin/admin.module';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { SpotifyService } from 'src/apis/spotify/spotify.service';

@Module({
  controllers: [RescueController],
  imports: [DatabaseModule, AdminModule],
  providers: [
    ...rescueProviders,
    RescueService,
    PaginationService,
    SpotifyService,
  ],
})
export class RescueModule {}
