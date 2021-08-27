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
exports.BadgeChallengeService = void 0;
const common_1 = require("@nestjs/common");
const badge_challenge_entity_1 = require("../../entities/badge-challenge.entity");
const typeorm_1 = require("typeorm");
let BadgeChallengeService = class BadgeChallengeService {
    constructor(badgeChallengeRepository) {
        this.badgeChallengeRepository = badgeChallengeRepository;
    }
    async findAll() {
        return await this.badgeChallengeRepository.find({
            order: { id: 'DESC' },
            where: { deleted: false, created_at: typeorm_1.MoreThanOrEqual(new Date()) },
        });
    }
    async findOne(id) {
        return await this.badgeChallengeRepository.findOne(id);
    }
};
BadgeChallengeService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('BADGE_CHALLENGE_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], BadgeChallengeService);
exports.BadgeChallengeService = BadgeChallengeService;
//# sourceMappingURL=badge-challenge.service.js.map