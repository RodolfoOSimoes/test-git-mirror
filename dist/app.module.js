"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const admin_module_1 = require("./backoffice/admin/admin.module");
const auth_module_1 = require("./auth/auth.module");
const auth_service_1 = require("./auth/auth.service");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mfa_service_1 = require("./utils/mfa/mfa.service");
const mailer_service_1 = require("./utils/mailer/mailer.service");
const session_module_1 = require("./backoffice/session/session.module");
const settings_module_1 = require("./backoffice/settings/settings.module");
const user_module_1 = require("./backoffice/user/user.module");
const state_module_1 = require("./backoffice/state/state.module");
const city_module_1 = require("./backoffice/city/city.module");
const region_module_1 = require("./backoffice/region/region.module");
const user_gratification_module_1 = require("./backoffice/user-gratification/user-gratification.module");
const campaign_module_1 = require("./backoffice/campaign/campaign.module");
const rescue_module_1 = require("./backoffice/rescue/rescue.module");
const statement_module_1 = require("./backoffice/statement/statement.module");
const badge_challenge_module_1 = require("./backoffice/badge-challenge/badge-challenge.module");
const comment_module_1 = require("./backoffice/comment/comment.module");
const quest_module_1 = require("./backoffice/quest/quest.module");
const product_module_1 = require("./backoffice/store/product/product.module");
const order_module_1 = require("./backoffice/store/order/order.module");
const user_module_2 = require("./backoffice/store/orders/user/user.module");
const address_module_1 = require("./backoffice/store/orders/address/address.module");
const pagination_service_1 = require("./utils/pagination/pagination.service");
const spotify_service_1 = require("./apis/spotify/spotify.service");
const user_module_3 = require("./client/user/user.module");
const cash_back_module_1 = require("./client/cash-back/cash-back.module");
const badge_module_1 = require("./client/badge/badge.module");
const address_module_2 = require("./client/address/address.module");
const location_module_1 = require("./client/location/location.module");
const setting_module_1 = require("./client/setting/setting.module");
const quest_module_2 = require("./client/quest/quest.module");
const product_module_2 = require("./client/store/product/product.module");
const order_module_2 = require("./client/store/order/order.module");
const badge_challenge_module_2 = require("./client/badge-challenge/badge-challenge.module");
const transaction_module_1 = require("./client/transaction/transaction.module");
const newsletter_module_1 = require("./client/newsletter/newsletter.module");
const youtube_service_1 = require("./apis/youtube/youtube.service");
const bull_1 = require("@nestjs/bull");
const mailer_1 = require("@nestjs-modules/mailer");
const sendMail_producer_service_1 = require("./jobs/producers/sendMail-producer-service");
const schedule_1 = require("@nestjs/schedule");
const RecentlyPlayedJob_1 = require("./jobs/RecentlyPlayedJob");
const authentication_module_1 = require("./utils/authentication/authentication.module");
const storage_module_1 = require("./utils/storage/storage.module");
const transaction_module_2 = require("./client/store/transaction/transaction.module");
const user_providers_1 = require("./providers/user.providers");
const database_module_1 = require("./database/database.module");
const ExtractJob_1 = require("./jobs/ExtractJob");
const campaign_providers_1 = require("./providers/campaign.providers");
const rescue_providers_1 = require("./providers/rescue.providers");
const recently_playeds_providers_1 = require("./providers/recently-playeds.providers");
const cash_backs_providers_1 = require("./providers/cash-backs.providers");
const statement_providers_1 = require("./providers/statement.providers");
const quest_providers_1 = require("./providers/quest.providers");
const quest_spotify_playlists_providers_1 = require("./providers/quest-spotify-playlists.providers");
const user_quest_spotify_playlists_providers_1 = require("./providers/user-quest-spotify-playlists.providers");
const extract_providers_1 = require("./providers/extract.providers");
const withdrawal_providers_1 = require("./providers/withdrawal.providers");
const SpotifyProductJob_1 = require("./jobs/SpotifyProductJob");
const RemoveOldRecentlyPlayedJob_1 = require("./jobs/RemoveOldRecentlyPlayedJob");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            schedule_1.ScheduleModule.forRoot(),
            bull_1.BullModule.registerQueue({
                redis: 'redis://:p4bf8c1b9b860c5e2dae74ad7ab5a3beb01c7792fa1c59355d1af50c926e362ca@ec2-54-164-11-40.compute-1.amazonaws.com:22449',
            }),
            mailer_1.MailerModule.forRoot({
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
            bull_1.BullModule.registerQueue({
                name: 'sendMail-queue',
            }),
            admin_module_1.AdminModule,
            auth_module_1.AuthModule,
            session_module_1.SessionModule,
            settings_module_1.SettingsModule,
            user_module_1.UserModule,
            state_module_1.StateModule,
            city_module_1.CityModule,
            region_module_1.RegionModule,
            user_gratification_module_1.UserGratificationModule,
            campaign_module_1.CampaignModule,
            rescue_module_1.RescueModule,
            statement_module_1.StatementModule,
            badge_challenge_module_1.BadgeChallengeModule,
            comment_module_1.CommentModule,
            quest_module_1.QuestModule,
            product_module_1.ProductModule,
            order_module_1.OrderModule,
            address_module_2.AddressModule,
            user_module_2.UserModule,
            user_module_3.UserModule,
            cash_back_module_1.CashBackModule,
            badge_module_1.BadgeModule,
            address_module_1.AddressModule,
            location_module_1.LocationModule,
            setting_module_1.SettingModule,
            quest_module_2.QuestModule,
            product_module_2.ProductModule,
            order_module_2.OrderModule,
            badge_challenge_module_2.BadgeChallengeModule,
            transaction_module_1.TransactionModule,
            newsletter_module_1.NewsletterModule,
            authentication_module_1.AuthenticationModule,
            storage_module_1.StorageModule,
            transaction_module_2.TransactionModule,
            database_module_1.DatabaseModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            auth_service_1.AuthService,
            mfa_service_1.MfaService,
            mailer_service_1.MailerService,
            pagination_service_1.PaginationService,
            spotify_service_1.SpotifyService,
            youtube_service_1.YoutubeService,
            sendMail_producer_service_1.SendMailProducerService,
            RecentlyPlayedJob_1.RecentlyPlayedJob,
            ExtractJob_1.ExtractJob,
            SpotifyProductJob_1.SpotifyProductJob,
            RemoveOldRecentlyPlayedJob_1.RemoveOldRecentlyPlayedJob,
            ...user_providers_1.userProviders,
            ...campaign_providers_1.campaignProviders,
            ...rescue_providers_1.rescueProviders,
            ...recently_playeds_providers_1.recentlyPlayedsProviders,
            ...cash_backs_providers_1.cashBackProviders,
            ...statement_providers_1.statementProviders,
            ...quest_providers_1.questProviders,
            ...quest_spotify_playlists_providers_1.questSpotifyPlaylistsProviders,
            ...user_quest_spotify_playlists_providers_1.userQuestSpotifyPlaylistsProviders,
            ...extract_providers_1.extractProviders,
            ...withdrawal_providers_1.withdrawalProviders,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map