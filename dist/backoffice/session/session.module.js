"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModule = void 0;
const common_1 = require("@nestjs/common");
const session_service_1 = require("./session.service");
const session_controller_1 = require("./session.controller");
const admin_module_1 = require("../admin/admin.module");
const mailer_service_1 = require("../../utils/mailer/mailer.service");
const mfa_service_1 = require("../../utils/mfa/mfa.service");
const auth_module_1 = require("../../auth/auth.module");
const auth_service_1 = require("../../auth/auth.service");
const sendMail_producer_service_1 = require("../../jobs/producers/sendMail-producer-service");
const bull_1 = require("@nestjs/bull");
const sendMail_consumer_1 = require("../../jobs/consumers/sendMail-consumer");
const user_module_1 = require("../../client/user/user.module");
const spotify_service_1 = require("../../apis/spotify/spotify.service");
let SessionModule = class SessionModule {
};
SessionModule = __decorate([
    common_1.Module({
        imports: [
            admin_module_1.AdminModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            bull_1.BullModule.registerQueue({
                name: 'sendMail-queue',
            }),
        ],
        controllers: [session_controller_1.SessionController],
        providers: [
            session_service_1.SessionService,
            mfa_service_1.MfaService,
            auth_service_1.AuthService,
            sendMail_producer_service_1.SendMailProducerService,
            sendMail_consumer_1.SendMailConsumer,
            spotify_service_1.SpotifyService,
        ],
    })
], SessionModule);
exports.SessionModule = SessionModule;
//# sourceMappingURL=session.module.js.map