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
exports.UserGratificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const admin_service_1 = require("../admin/admin.service");
const user_service_1 = require("../user/user.service");
const statement_entity_1 = require("../../entities/statement.entity");
const campaign_entity_1 = require("../../entities/campaign.entity");
const date_utils_1 = require("../../utils/date.utils");
let UserGratificationService = class UserGratificationService {
    constructor(userGratificationRepository, statementRepository, campaignRepository, adminService, userService) {
        this.userGratificationRepository = userGratificationRepository;
        this.statementRepository = statementRepository;
        this.campaignRepository = campaignRepository;
        this.adminService = adminService;
        this.userService = userService;
    }
    async create(admin_id, data) {
        const admin = await this.adminService.findById(admin_id);
        const user = await this.userService.findOne(data.gratification.user_id);
        const userGratification = await this.userGratificationRepository.save({
            admin: admin,
            user: user,
            deleted: false,
            score: data.gratification.score,
            created_at: new Date(),
            updated_at: new Date(),
            kind: 1,
            is_cashback: false,
        });
        const campaign = await this.campaignRepository.findOne({
            status: true,
            date_start: typeorm_1.LessThanOrEqual(date_utils_1.formatDate(new Date())),
            date_finish: typeorm_1.MoreThanOrEqual(date_utils_1.formatDate(new Date())),
        });
        await this.statementRepository.save({
            user: user,
            admin: admin,
            campaign: campaign,
            kind: 1,
            amount: data.gratification.score,
            statementable_type: 'UserGratification',
            deleted: false,
            statementable_id: userGratification.id,
            created_at: new Date(),
            updated_at: new Date(),
            expiration_date: new Date(new Date().setDate(new Date().getDate() + 90)),
        });
        return { message: 'Gratificação criada com sucesso.' };
    }
    async delete(id) {
        const userGratification = await this.userGratificationRepository.findOne(id);
        await this.statementRepository.delete({
            statementable_type: 'UserGratification',
            statementable_id: userGratification.id,
        });
        this.userGratificationRepository.update(userGratification.id, {
            updated_at: new Date(),
            deleted: true,
        });
    }
};
UserGratificationService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('USER_GRATIFICATION_REPOSITORY')),
    __param(1, common_1.Inject('STATEMENT_REPOSITORY')),
    __param(2, common_1.Inject('CAMPAIGN_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        admin_service_1.AdminService,
        user_service_1.UserService])
], UserGratificationService);
exports.UserGratificationService = UserGratificationService;
//# sourceMappingURL=user-gratification.service.js.map