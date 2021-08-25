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
exports.RemoveOldRecentlyPlayedJob = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const spotify_service_1 = require("../apis/spotify/spotify.service");
const recently_playeds_entity_1 = require("../entities/recently-playeds.entity");
const user_entity_1 = require("../entities/user.entity");
const typeorm_1 = require("typeorm");
let RemoveOldRecentlyPlayedJob = class RemoveOldRecentlyPlayedJob {
    constructor(recentlyPlayedRepository) {
        this.recentlyPlayedRepository = recentlyPlayedRepository;
    }
    async handleCron() {
        try {
            await typeorm_1.getConnection()
                .createQueryBuilder()
                .delete()
                .from(recently_playeds_entity_1.RecentlyPlayeds)
                .where('created_at < :created_at LIMIT 50', {
                created_at: this.getDate(),
            })
                .execute();
        }
        catch (error) { }
    }
    getDate() {
        const date = new Date();
        const month = date.getMonth() + 1;
        const day = date.getDate() - 3;
        const year = date.getFullYear();
        const formatedData = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} 23:59:59`;
        return formatedData;
    }
};
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_10_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RemoveOldRecentlyPlayedJob.prototype, "handleCron", null);
RemoveOldRecentlyPlayedJob = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('RECENTLY_PLAYEDS_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], RemoveOldRecentlyPlayedJob);
exports.RemoveOldRecentlyPlayedJob = RemoveOldRecentlyPlayedJob;
//# sourceMappingURL=RemoveOldRecentlyPlayedJob.js.map