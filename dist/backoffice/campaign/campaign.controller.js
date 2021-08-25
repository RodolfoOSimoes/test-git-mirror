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
exports.CampaignController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const AdminRoles_1 = require("../../enums/AdminRoles");
const campaign_service_1 = require("./campaign.service");
const create_campaign_dto_1 = require("./dto/create-campaign.dto");
const update_campaign_dto_1 = require("./dto/update-campaign.dto");
let CampaignController = class CampaignController {
    constructor(campaignService) {
        this.campaignService = campaignService;
    }
    create(req, createCampaignDto) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.campaignService.create(req.user.id, createCampaignDto);
        else
            throw new common_2.UnauthorizedException();
    }
    findAll(req, page) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.campaignService.findAll(page);
        else
            throw new common_2.UnauthorizedException();
    }
    findOne(req, id) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.campaignService.findOne(id);
        else
            throw new common_2.UnauthorizedException();
    }
    update(req, id, updateCampaignDto) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.campaignService.update(req.user.id, id, updateCampaignDto);
        else
            throw new common_2.UnauthorizedException();
    }
    remove(req, id) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.campaignService.remove(id);
        else
            throw new common_2.UnauthorizedException();
    }
};
__decorate([
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_2.Post(),
    __param(0, common_2.Request()),
    __param(1, common_2.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_campaign_dto_1.CreateCampaignDto]),
    __metadata("design:returntype", void 0)
], CampaignController.prototype, "create", null);
__decorate([
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_2.Get(),
    __param(0, common_2.Request()),
    __param(1, common_1.Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], CampaignController.prototype, "findAll", null);
__decorate([
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_2.Get(':id'),
    __param(0, common_2.Request()),
    __param(1, common_2.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], CampaignController.prototype, "findOne", null);
__decorate([
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put(':id'),
    __param(0, common_2.Request()),
    __param(1, common_2.Param('id')),
    __param(2, common_2.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_campaign_dto_1.UpdateCampaignDto]),
    __metadata("design:returntype", void 0)
], CampaignController.prototype, "update", null);
__decorate([
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_2.Delete(':id'),
    __param(0, common_2.Request()),
    __param(1, common_2.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], CampaignController.prototype, "remove", null);
CampaignController = __decorate([
    common_2.Controller('v1/backoffice/campaigns'),
    __metadata("design:paramtypes", [campaign_service_1.CampaignService])
], CampaignController);
exports.CampaignController = CampaignController;
//# sourceMappingURL=campaign.controller.js.map