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
exports.CampaignService = void 0;
const common_1 = require("@nestjs/common");
const pagination_service_1 = require("../../utils/pagination/pagination.service");
const typeorm_1 = require("typeorm");
const admin_service_1 = require("../admin/admin.service");
let CampaignService = class CampaignService {
    constructor(campaignRepository, adminService, paginationService) {
        this.campaignRepository = campaignRepository;
        this.adminService = adminService;
        this.paginationService = paginationService;
    }
    async create(admin_id, data) {
        const admin = await this.adminService.findById(admin_id);
        await this.campaignRepository.save(Object.assign({ admin: admin }, data.campaign));
        return { message: 'Campanha criada com sucesso.' };
    }
    async findAll(page = 1) {
        const limit = 10;
        const count = await this.campaignRepository.count();
        const data = await this.campaignRepository.find({
            skip: (page - 1) * limit,
            take: limit,
            order: { id: 'DESC' },
        });
        return {
            data,
            currentPage: page,
            size: Math.ceil(count / limit),
            links: this.paginationService.pagination('v1/backoffice/campaigns', page, limit, count),
        };
    }
    async findOne(id) {
        return await this.campaignRepository.findOne(id);
    }
    async update(admin_id, id, data) {
        const admin = await this.adminService.findById(admin_id);
        await this.campaignRepository.update(id, Object.assign({ admin: admin }, data.campaign));
        return { message: 'Campanha atualizada com sucesso.' };
    }
    async remove(id) {
        await this.campaignRepository.update(id, {
            deleted: true,
        });
        return { message: 'Campanha deletada com sucesso.' };
    }
};
CampaignService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('CAMPAIGN_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        admin_service_1.AdminService,
        pagination_service_1.PaginationService])
], CampaignService);
exports.CampaignService = CampaignService;
//# sourceMappingURL=campaign.service.js.map