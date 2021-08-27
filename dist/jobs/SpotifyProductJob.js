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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyProductJob = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const spotify_service_1 = require("../apis/spotify/spotify.service");
const user_entity_1 = require("../entities/user.entity");
const typeorm_1 = require("typeorm");
let SpotifyProductJob = class SpotifyProductJob {
    constructor(userRepository, spotifyService) {
        this.userRepository = userRepository;
        this.spotifyService = spotifyService;
    }
    async handleCron() {
        const users = await this.loadUsers();
        users.forEach(async (user) => {
            try {
                const result = await this.spotifyService.getuser(user.credentials['refresh_token']);
                if (result && result.product) {
                    await this.userRepository.update(user.id, {
                        product: result.product,
                        updated_at: new Date(),
                        last_time_checked_product: new Date(),
                    });
                }
            }
            catch (error) {
                console.log(`user_id: ${user.id} - error:: ${error.message}`);
            }
        });
    }
    async loadUsers() {
        return await this.userRepository.find({
            where: {
                deleted: false,
                situation: false,
                have_accepted: true,
            },
            select: ['id', 'credentials', 'product'],
        });
    }
};
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_DAY_AT_1AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SpotifyProductJob.prototype, "handleCron", null);
SpotifyProductJob = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('USER_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        spotify_service_1.SpotifyService])
], SpotifyProductJob);
exports.SpotifyProductJob = SpotifyProductJob;
//# sourceMappingURL=SpotifyProductJob.js.map