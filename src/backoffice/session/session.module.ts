import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { AdminModule } from '../admin/admin.module';
import { MailerService } from 'src/utils/mailer/mailer.service';
import { MfaService } from 'src/utils/mfa/mfa.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { SendMailProducerService } from 'src/jobs/producers/sendMail-producer-service';
import { BullModule } from '@nestjs/bull';
import { SendMailConsumer } from 'src/jobs/consumers/sendMail-consumer';
import { UserModule } from 'src/client/user/user.module';
import { SpotifyService } from 'src/apis/spotify/spotify.service';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    UserModule,
    BullModule.registerQueue({
      name: 'sendMail-queue',
    }),
  ],
  controllers: [SessionController],
  providers: [
    SessionService,
    MfaService,
    AuthService,
    SendMailProducerService,
    SendMailConsumer,
    SpotifyService,
  ],
})
export class SessionModule {}
