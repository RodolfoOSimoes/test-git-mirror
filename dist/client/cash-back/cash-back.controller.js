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
exports.CashBackController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const cash_back_service_1 = require("./cash-back.service");
let CashBackController = class CashBackController {
    constructor(cashBackService) {
        this.cashBackService = cashBackService;
    }
    findAll(req) {
        if (req.user.roles == 'spotify')
            return this.cashBackService.findAll(req.user.id);
        throw new common_1.UnauthorizedException();
    }
    findOne(req, id) {
        if (req.user.roles == 'spotify')
            return this.cashBackService.findOne(id);
        throw new common_1.UnauthorizedException();
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CashBackController.prototype, "findAll", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(':id'),
    __param(0, common_1.Request()),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], CashBackController.prototype, "findOne", null);
CashBackController = __decorate([
    common_1.Controller('v1/app/users/cash_backs'),
    __metadata("design:paramtypes", [cash_back_service_1.CashBackService])
], CashBackController);
exports.CashBackController = CashBackController;
//# sourceMappingURL=cash-back.controller.js.map