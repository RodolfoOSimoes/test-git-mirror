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
const storage_service_1 = require("../../utils/storage/storage.service");
let CampaignService = class CampaignService {
    constructor(campaignRepository, adminService, paginationService, storageService) {
        this.campaignRepository = campaignRepository;
        this.adminService = adminService;
        this.paginationService = paginationService;
        this.storageService = storageService;
    }
    async create(admin_id, data) {
        var _a, _b;
        const admin = await this.adminService.findById(admin_id);
        const campaing = await this.campaignRepository.save({
            admin: admin,
            name: data.campaign.name,
            slug: data.campaign.slug,
            date_finish: data.campaign.date_finish,
            date_start: data.campaign.date_start,
            status: data.campaign.status,
            created_at: new Date(),
            updated_at: new Date(),
            users_count: 0,
        });
        if ((_b = (_a = data === null || data === void 0 ? void 0 : data.campaign) === null || _a === void 0 ? void 0 : _a.image) === null || _b === void 0 ? void 0 : _b.data)
            await this.storageService.createPic(data.campaign.image.data, campaing.id, 'Campaign');
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
        var _a, _b;
        const admin = await this.adminService.findById(admin_id);
        await this.campaignRepository.update(id, {
            admin: admin,
            name: data.campaign.name,
            slug: data.campaign.slug,
            date_finish: data.campaign.date_finish,
            date_start: data.campaign.date_start,
            status: data.campaign.status,
            updated_at: new Date(),
        });
        if ((_b = (_a = data === null || data === void 0 ? void 0 : data.campaign) === null || _a === void 0 ? void 0 : _a.image) === null || _b === void 0 ? void 0 : _b.data)
            await this.storageService.updatePic(data.campaign.image.data, id, 'Campaign');
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
        pagination_service_1.PaginationService,
        storage_service_1.StorageService])
], CampaignService);
exports.CampaignService = CampaignService;
//# sourceMappingURL=campaign.service.js.map