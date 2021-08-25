import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { adminProviders } from '../../providers/admin.providers';
import { DatabaseModule } from 'src/database/database.module';
import { MfaService } from 'src/utils/mfa/mfa.service';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { userProviders } from 'src/providers/user.providers';
import { BullModule } from '@nestjs/bull';
import { SendMailProducerService } from 'src/jobs/producers/sendMail-producer-service';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'sendMail-queue',
    }),
  ],
  controllers: [AdminController],
  providers: [
    ...adminProviders,
    ...userProviders,
    AdminService,
    MfaService,
    SendMailProducerService,
    PaginationService,
  ],
  exports: [AdminService],
})
export class AdminModule {}
