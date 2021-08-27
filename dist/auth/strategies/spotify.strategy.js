"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyStrategy = void 0;
const passport_spotify_1 = require("passport-spotify");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let SpotifyStrategy = class SpotifyStrategy extends passport_1.PassportStrategy(passport_spotify_1.Strategy) {
    constructor(configService) {
        super({
            clientID: process.env.SPOTIFY_CLIENT,
            clientSecret: process.env.SPOTIFY_SECRET,
            callbackURL: configService.get('FILTRGAME_URL'),
            scope: 'user-read-recently-played user-modify-playback-state user-read-playback-state playlist-read-private user-follow-modify playlist-modify-public user-read-private user-read-email user-library-modify user-library-read',
        });
        this.configService = configService;
    }
    async validate(accessToken, refreshToken, expires_in, profile) {
        return { profile, accessToken, refreshToken, expires_in };
    }
};
SpotifyStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SpotifyStrategy);
exports.SpotifyStrategy = SpotifyStrategy;
//# sourceMappingURL=spotify.strategy.js.map