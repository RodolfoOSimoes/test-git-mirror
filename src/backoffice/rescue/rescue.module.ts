import { Module } from '@nestjs/common';
import { RescueService } from './rescue.service';
import { RescueController } from './rescue.controller';
import { rescueProviders } from '../../providers/rescue.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AdminModule } from '../admin/admin.module';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { SpotifyService } from 'src/apis/spotify/spotify.service';
import { SendMailProducerService } from 'src/jobs/producers/sendMail-producer-service';
import { BullModule } from '@nestjs/bull';
import { ExcelService } from 'src/utils/excel/excel.service';

@Module({
  controllers: [RescueController],
  imports: [
    DatabaseModule,
    AdminModule,
    BullModule.registerQueue({
      name: 'sendMail-queue',
    }),
  ],
  providers: [
    ...rescueProviders,
    RescueService,
    PaginationService,
    SendMailProducerService,
    SpotifyService,
    ExcelService,
  ],
})
export class RescueModule {}
