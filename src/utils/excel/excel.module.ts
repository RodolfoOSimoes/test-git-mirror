import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SendMailProducerService } from 'src/jobs/producers/sendMail-producer-service';
import { ExcelService } from './excel.service';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'sendMail-queue',
    }),
  ],
  providers: [ExcelService, SendMailProducerService],
  exports: [ExcelService],
})
export class ExcelModule {}
