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
exports.RescueController = void 0;
const common_1 = require("@nestjs/common");
const rescue_service_1 = require("./rescue.service");
const create_rescue_dto_1 = require("./dto/create-rescue.dto");
const update_rescue_dto_1 = require("./dto/update-rescue.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const AdminRoles_1 = require("../../enums/AdminRoles");
let RescueController = class RescueController {
    constructor(rescueService) {
        this.rescueService = rescueService;
    }
    create(req, createRescueDto) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.rescueService.create(req.user.id, createRescueDto);
        else
            throw new common_1.UnauthorizedException();
    }
    findAll(req, page) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.rescueService.findAll(page);
        else
            throw new common_1.UnauthorizedException();
    }
    findOne(req, id) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.rescueService.findOne(id);
        else
            throw new common_1.UnauthorizedException();
    }
    update(req, id, updateRescueDto) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.rescueService.update(req.user.id, id, updateRescueDto);
        else
            throw new common_1.UnauthorizedException();
    }
    remove(req, id) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.rescueService.remove(id);
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
    __metadata("design:paramtypes", [Object, create_rescue_dto_1.CreateRescueDto]),
    __metadata("design:returntype", void 0)
], RescueController.prototype, "create", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(),
    __param(0, common_1.Request()),
    __param(1, common_1.Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], RescueController.prototype, "findAll", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(':id'),
    __param(0, common_1.Request()),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], RescueController.prototype, "findOne", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put(':id'),
    __param(0, common_1.Request()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_rescue_dto_1.UpdateRescueDto]),
    __metadata("design:returntype", void 0)
], RescueController.prototype, "update", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Request()),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], RescueController.prototype, "remove", null);
RescueController = __decorate([
    common_1.Controller('v1/backoffice/rescues'),
    __metadata("design:paramtypes", [rescue_service_1.RescueService])
], RescueController);
exports.RescueController = RescueController;
//# sourceMappingURL=rescue.controller.js.map