"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const local_strategy_1 = require("./strategies/local.strategy");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const admin_module_1 = require("../backoffice/admin/admin.module");
const auth_controller_1 = require("./auth.controller");
const spotify_strategy_1 = require("./strategies/spotify.strategy");
const user_module_1 = require("../client/user/user.module");
const database_module_1 = require("../database/database.module");
const spotify_service_1 = require("../apis/spotify/spotify.service");
const config_1 = require("@nestjs/config");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            admin_module_1.AdminModule,
            passport_1.PassportModule,
            user_module_1.UserModule,
            database_module_1.DatabaseModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '30d' },
            }),
        ],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            spotify_strategy_1.SpotifyStrategy,
            spotify_service_1.SpotifyService,
        ],
        exports: [auth_service_1.AuthService, jwt_1.JwtModule, passport_1.PassportModule],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map