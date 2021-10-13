import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from '../../providers/user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { SpotifyService } from 'src/apis/spotify/spotify.service';
import { addressProviders } from 'src/providers/address.providers';
import { statementProviders } from 'src/providers/statement.providers';
import { withdrawalProviders } from 'src/providers/withdrawal.providers';
import { AdminService } from '../admin/admin.service';
import { adminProviders } from 'src/providers/admin.providers';
import { MfaService } from 'src/utils/mfa/mfa.service';
import { SendMailProducerService } from 'src/jobs/producers/sendMail-producer-service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'sendMail-queue',
    }),
  ],
  controllers: [UserController],
  providers: [
    ...userProviders,
    ...addressProviders,
    ...statementProviders,
    ...withdrawalProviders,
    ...adminProviders,
    AdminService,
    MfaService,
    SendMailProducerService,
    UserService,
    PaginationService,
    SpotifyService,
  ],
  exports: [UserModule, UserService],
})
export class UserModule {}
