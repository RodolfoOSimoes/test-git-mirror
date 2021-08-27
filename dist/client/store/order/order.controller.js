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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const order_service_1 = require("./order.service");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    findKind(req, kind) {
        if (req.user.roles == 'spotify')
            return this.orderService.findKind(req.user.id, kind);
        throw new common_2.UnauthorizedException();
    }
    findOne(req, id) {
        if (req.user.roles == 'spotify')
            return this.orderService.findOne(id);
        throw new common_2.UnauthorizedException();
    }
    findTracking(req, tracking_id) {
        if (req.user.roles == 'spotify')
            return this.orderService.findTracking(tracking_id);
        throw new common_2.UnauthorizedException();
    }
};
__decorate([
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_2.Get(),
    __param(0, common_2.Request()),
    __param(1, common_1.Query('kind')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findKind", null);
__decorate([
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_2.Get(':id'),
    __param(0, common_2.Request()),
    __param(1, common_2.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findOne", null);
__decorate([
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_2.Get('tracking/:tracking_id'),
    __param(0, common_2.Request()),
    __param(1, common_2.Param('tracking_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findTracking", null);
OrderController = __decorate([
    common_2.Controller('v1/app/store/orders'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map