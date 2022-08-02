import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './backoffice/admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MfaService } from './utils/mfa/mfa.service';
import { MailerService } from './utils/mailer/mailer.service';
import { SessionModule } from './backoffice/session/session.module';
import { SettingsModule as SettingsBackoffice } from './backoffice/settings/settings.module';
import { UserModule as AdminUserModule } from './backoffice/user/user.module';
import { StateModule } from './backoffice/state/state.module';
import { CityModule } from './backoffice/city/city.module';
import { RegionModule } from './backoffice/region/region.module';
import { UserGratificationModule } from './backoffice/user-gratification/user-gratification.module';
import { CampaignModule } from './backoffice/campaign/campaign.module';
import { RescueModule } from './backoffice/rescue/rescue.module';
import { StatementModule } from './backoffice/statement/statement.module';
import { BadgeChallengeModule as BadgeChallengeBackofficeModule } from './backoffice/badge-challenge/badge-challenge.module';
import { CommentModule } from './backoffice/comment/comment.module';
import { QuestModule as QuestBackofficeModule } from './backoffice/quest/quest.module';
import { ProductModule as ProductBackofficeModule } from './backoffice/store/product/product.module';
import { OrderModule as OrderBackofficeOrderModule } from './backoffice/store/order/order.module';
import { UserModule as OrderUserModule } from './backoffice/store/orders/user/user.module';
import { AddressModule } from './backoffice/store/orders/address/address.module';
import { PaginationService } from './utils/pagination/pagination.service';
import { SpotifyService } from './apis/spotify/spotify.service';
import { UserModule as UserClientModule } from './client/user/user.module';
import { CashBackModule } from './client/cash-back/cash-back.module';
import { CampaignModule as CampaignClientModule } from './client/campaign/campaign.module';
import { BadgeModule } from './client/badge/badge.module';
import { AddressModule as AddressClientModule } from './client/address/address.module';
import { LocationModule } from './client/location/location.module';
import { SettingModule } from './client/setting/setting.module';
import { QuestModule } from './client/quest/quest.module';
import { ProductModule } from './client/store/product/product.module';
import { OrderModule } from './client/store/order/order.module';
import { BadgeChallengeModule } from './client/badge-challenge/badge-challenge.module';
import { TransactionModule } from './client/transaction/transaction.module';
import { NewsletterModule } from './client/newsletter/newsletter.module';
import { YoutubeService } from './apis/youtube/youtube.service';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { SendMailProducerService } from './jobs/producers/sendMail-producer-service';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthenticationModule } from './utils/authentication/authentication.module';
import { StorageModule } from './utils/storage/storage.module';
import { TransactionModule as StoreTransactionModule } from './client/store/transaction/transaction.module';
import { userProviders } from './providers/user.providers';
import { DatabaseModule } from './database/database.module';
import { ExtractJob } from './jobs/ExtractJob';
import { campaignProviders } from './providers/campaign.providers';
import { rescueProviders } from './providers/rescue.providers';
import { recentlyPlayedsProviders } from './providers/recently-playeds.providers';
import { cashBackProviders } from './providers/cash-backs.providers';
import { statementProviders } from './providers/statement.providers';
import { questProviders } from './providers/quest.providers';
import { questSpotifyPlaylistsProviders } from './providers/quest-spotify-playlists.providers';
import { userQuestSpotifyPlaylistsProviders } from './providers/user-quest-spotify-playlists.providers';
import { extractProviders } from './providers/extract.providers';
import { withdrawalProviders } from './providers/withdrawal.providers';
import { SpotifyProductJob } from './jobs/SpotifyProductJob';
import { RemoveOldRecentlyPlayedJob } from './jobs/RemoveOldRecentlyPlayedJob';
import { userStreamRecordsProviders } from './providers/user_stream_records.providers';
import { streamRecordsProviders } from './providers/stream_records.providers';
import { StreamRecordsJob } from './jobs/StreamRecordsJob';
import { ExcelModule } from './utils/excel/excel.module';
import { PreSaveJob } from './jobs/PreSaveJob';
import { questPreSavesProviders } from './providers/quest-pre-saves.providers ';
import { preSaveUsersProviders } from './providers/pre-save-user.providers';
import { CashBackBalanceJob } from './jobs/CashBackBalanceJob';
import { cashBackBalanceProviders } from './providers/cash-backs-balance.providers';
import { platformProviders } from './providers/platform.providers';
import { userPlatformProviders } from './providers/user-platform.providers';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASS,
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        ignoreSSL: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
    }),
    BullModule.registerQueue({
      name: 'sendMail-queue',
    }),
    AdminModule,
    AuthModule,
    SessionModule,
    SettingsBackoffice,
    AdminUserModule,
    StateModule,
    CityModule,
    RegionModule,
    UserGratificationModule,
    CampaignModule,
    RescueModule,
    StatementModule,
    BadgeChallengeBackofficeModule,
    CommentModule,
    QuestBackofficeModule,
    ProductBackofficeModule,
    OrderBackofficeOrderModule,
    AddressClientModule,
    OrderUserModule,
    UserClientModule,
    CampaignClientModule,
    CashBackModule,
    BadgeModule,
    AddressModule,
    LocationModule,
    SettingModule,
    QuestModule,
    ProductModule,
    OrderModule,
    BadgeChallengeModule,
    TransactionModule,
    NewsletterModule,
    AuthenticationModule,
    StorageModule,
    StoreTransactionModule,
    DatabaseModule,
    ExcelModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    MfaService,
    MailerService,
    PaginationService,
    SpotifyService,
    YoutubeService,
    SendMailProducerService,
    ExtractJob,
    StreamRecordsJob,
    CashBackBalanceJob,
    PreSaveJob,
    SpotifyProductJob,
    RemoveOldRecentlyPlayedJob,
    ...userProviders,
    ...campaignProviders,
    ...rescueProviders,
    ...recentlyPlayedsProviders,
    ...cashBackProviders,
    ...statementProviders,
    ...questProviders,
    ...questSpotifyPlaylistsProviders,
    ...userQuestSpotifyPlaylistsProviders,
    ...extractProviders,
    ...withdrawalProviders,
    ...userStreamRecordsProviders,
    ...streamRecordsProviders,
    ...questPreSavesProviders,
    ...preSaveUsersProviders,
    ...cashBackBalanceProviders,
    ...platformProviders,
    ...userPlatformProviders,
  ],
})
export class AppModule {}
