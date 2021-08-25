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
const pagination_service_1 = require("../../utils/pagination/pagination.service");
const typeorm_1 = require("typeorm");
const admin_service_1 = require("../admin/admin.service");
let BadgeChallengeService = class BadgeChallengeService {
    constructor(badgeChallengeRepository, adminService, paginationService) {
        this.badgeChallengeRepository = badgeChallengeRepository;
        this.adminService = adminService;
        this.paginationService = paginationService;
    }
    async create(admin_id, dto) {
        const admin = await this.adminService.findById(admin_id);
        await this.badgeChallengeRepository.save(Object.assign({ admin: admin }, dto.challenge));
        return { message: 'Challenge criado com sucesso.' };
    }
    async findAll(page = 1) {
        var _a;
        const limit = 20;
        const count = await this.badgeChallengeRepository.count({
            where: { deleted: false },
        });
        const data = (_a = (await this.badgeChallengeRepository.find({
            skip: (page - 1) * limit,
            take: limit,
            where: { deleted: false },
            order: { id: 'DESC' },
        }))) === null || _a === void 0 ? void 0 : _a.map((badgeChallenger) => {
            return this.badgeChallengeMapper(badgeChallenger);
        });
        return {
            data,
            currentPage: page,
            size: Math.ceil(count / limit),
            links: this.paginationService.pagination('v1/backoffice/badge_challenges', page, limit, count),
        };
    }
    async findOne(id) {
        return await this.badgeChallengeRepository.findOne(id);
    }
    async update(admin_id, id, dto) {
        const admin = await this.adminService.findById(admin_id);
        await this.badgeChallengeRepository.update(id, Object.assign({ admin: admin }, dto.challenge));
        return { message: 'Challenge atualizado com sucesso.' };
    }
    async remove(id) {
        await this.badgeChallengeRepository.update(id, {
            deleted: true,
        });
        return { message: 'Challenge deletado com sucesso.' };
    }
    badgeChallengeMapper(badgeChallenger) {
        return {
            id: badgeChallenger.id,
            name: badgeChallenger.name,
            total_times_of_streamings: badgeChallenger.total_times_of_streamings,
            status: badgeChallenger.status,
        };
    }
};
BadgeChallengeService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('BADGE_CHALLENGE_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        admin_service_1.AdminService,
        pagination_service_1.PaginationService])
], BadgeChallengeService);
exports.BadgeChallengeService = BadgeChallengeService;
//# sourceMappingURL=badge-challenge.service.js.map