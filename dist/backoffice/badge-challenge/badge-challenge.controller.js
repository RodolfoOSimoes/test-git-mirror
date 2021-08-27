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
exports.BadgeChallengeController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const AdminRoles_1 = require("../../enums/AdminRoles");
const badge_challenge_service_1 = require("./badge-challenge.service");
const create_badge_challenge_dto_1 = require("./dto/create-badge-challenge.dto");
const update_badge_challenge_dto_1 = require("./dto/update-badge-challenge.dto");
let BadgeChallengeController = class BadgeChallengeController {
    constructor(badgeChallengeService) {
        this.badgeChallengeService = badgeChallengeService;
    }
    create(req, createBadgeChallengeDto) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.badgeChallengeService.create(req.user.id, createBadgeChallengeDto);
        else
            throw new common_1.UnauthorizedException();
    }
    findAll(req, page) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.badgeChallengeService.findAll(page);
        else
            throw new common_1.UnauthorizedException();
    }
    findOne(req, id) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.badgeChallengeService.findOne(id);
        else
            throw new common_1.UnauthorizedException();
    }
    update(req, id, updateBadgeChallengeDto) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.badgeChallengeService.update(req.user.id, id, updateBadgeChallengeDto);
        else
            throw new common_1.UnauthorizedException();
    }
    remove(req, id) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.badgeChallengeService.remove(id);
        else
            throw new common_1.UnauthorizedException();
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post(),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_badge_challenge_dto_1.CreateBadgeChallengeDto]),
    __metadata("design:returntype", void 0)
], BadgeChallengeController.prototype, "create", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(),
    __param(0, common_1.Request()),
    __param(1, common_1.Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], BadgeChallengeController.prototype, "findAll", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(':id'),
    __param(0, common_1.Request()),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], BadgeChallengeController.prototype, "findOne", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put(':id'),
    __param(0, common_1.Request()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_badge_challenge_dto_1.UpdateBadgeChallengeDto]),
    __metadata("design:returntype", void 0)
], BadgeChallengeController.prototype, "update", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Request()),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], BadgeChallengeController.prototype, "remove", null);
BadgeChallengeController = __decorate([
    common_1.Controller('v1/backoffice/badge_challenges'),
    __metadata("design:paramtypes", [badge_challenge_service_1.BadgeChallengeService])
], BadgeChallengeController);
exports.BadgeChallengeController = BadgeChallengeController;
//# sourceMappingURL=badge-challenge.controller.js.map