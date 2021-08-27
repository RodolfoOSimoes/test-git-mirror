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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const AdminRoles_1 = require("../../enums/AdminRoles");
const admin_service_1 = require("./admin.service");
const create_admin_dto_1 = require("./dto/create-admin.dto");
const update_profile_dto_1 = require("./dto/update-profile.dto");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    create(req, createAdminDto) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.adminService.create(createAdminDto);
        else
            throw new common_1.UnauthorizedException();
    }
    findAll(req, page) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.adminService.findAll(page);
        else
            throw new common_1.UnauthorizedException();
    }
    me(req) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.adminService.me(req.user.email);
        else
            throw new common_1.UnauthorizedException();
    }
    findOne(req, id) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.adminService.findOne(id);
        else
            throw new common_1.UnauthorizedException();
    }
    forgetPassword(req, createAdminDto) {
        return this.adminService.forgetPassword(createAdminDto.admin.email);
    }
    update(req, id, createAdminDto) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.adminService.update(id, createAdminDto);
        else
            throw new common_1.UnauthorizedException();
    }
    updateByToken(req, createAdminDto) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.adminService.updateByToken(req.user.email, createAdminDto);
        else
            throw new common_1.UnauthorizedException();
    }
    remove(req) {
        return this.adminService.remove(req.user.email);
    }
    updatePassword(req, dto) {
        return this.adminService.updateProfile(req.user.id, dto);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('admins'),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "create", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    roles_decorator_1.Roles(AdminRoles_1.AdminRole.MASTER),
    common_1.Get('admins'),
    __param(0, common_1.Request()),
    __param(1, common_1.Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAll", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('admins/me'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "me", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('admins/:id'),
    __param(0, common_1.Request()),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findOne", null);
__decorate([
    common_1.Post('admins/forget_password'),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "forgetPassword", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put('admins/:id'),
    __param(0, common_1.Request()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "update", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put('admins'),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateByToken", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete('admins'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "remove", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put('profile'),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_profile_dto_1.UpdateAdminProfileDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updatePassword", null);
AdminController = __decorate([
    common_1.Controller('v1/backoffice'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map