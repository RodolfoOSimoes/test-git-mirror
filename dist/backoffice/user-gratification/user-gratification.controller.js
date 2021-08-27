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
exports.UserGratificationController = void 0;
const common_1 = require("@nestjs/common");
const user_gratification_service_1 = require("./user-gratification.service");
const create_user_gratification_dto_1 = require("./dto/create-user-gratification.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const AdminRoles_1 = require("../../enums/AdminRoles");
let UserGratificationController = class UserGratificationController {
    constructor(userGratificationService) {
        this.userGratificationService = userGratificationService;
    }
    create(req, createUserGratificationDto) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.userGratificationService.create(req.user.id, createUserGratificationDto);
        else
            throw new common_1.UnauthorizedException();
    }
    findAll(req, page) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.userGratificationService.findAll(page);
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
    __metadata("design:paramtypes", [Object, create_user_gratification_dto_1.CreateUserGratificationDto]),
    __metadata("design:returntype", void 0)
], UserGratificationController.prototype, "create", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(),
    __param(0, common_1.Request()),
    __param(1, common_1.Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], UserGratificationController.prototype, "findAll", null);
UserGratificationController = __decorate([
    common_1.Controller('v1/backoffice/gratifications'),
    __metadata("design:paramtypes", [user_gratification_service_1.UserGratificationService])
], UserGratificationController);
exports.UserGratificationController = UserGratificationController;
//# sourceMappingURL=user-gratification.controller.js.map