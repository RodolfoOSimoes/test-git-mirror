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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const update_terms_dto_1 = require("./dto/update-terms.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    findOne(req) {
        if (req.user.roles == 'spotify')
            return this.userService.findOne(req.user.id);
        throw new common_1.UnauthorizedException();
    }
    updateUser(req, updateUserDto) {
        if (req.user.roles == 'spotify')
            return this.userService.update(req.user.id, updateUserDto);
        throw new common_1.UnauthorizedException();
    }
    updateTerms(req, updateTerms) {
        if (req.user.roles == 'spotify')
            return this.userService.updateTerms(req.user.id, updateTerms);
        throw new common_1.UnauthorizedException();
    }
    remove(req) {
        if (req.user.roles == 'spotify')
            return this.userService.remove(req.user.id);
        throw new common_1.UnauthorizedException();
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('me'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put('me'),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put('accept'),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_terms_dto_1.UpdateTermsDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateTerms", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete('me'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
UserController = __decorate([
    common_1.Controller('v1/app/users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map