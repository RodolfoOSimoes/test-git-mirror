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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const AdminRoles_1 = require("../../../enums/AdminRoles");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    create(req, createProductDto) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.productService.create(req.user.id, createProductDto);
        else
            throw new common_1.UnauthorizedException();
    }
    findAll(req, page) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.productService.findAll(page);
        else
            throw new common_1.UnauthorizedException();
    }
    findOne(req, id) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.productService.findOne(id);
        else
            throw new common_1.UnauthorizedException();
    }
    update(req, id, updateProductDto) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.productService.update(req.user.id, id, updateProductDto);
        else
            throw new common_1.UnauthorizedException();
    }
    remove(req, id) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.productService.remove(id);
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
    __metadata("design:paramtypes", [Object, create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "create", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(),
    __param(0, common_1.Request()),
    __param(1, common_1.Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findAll", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(':id'),
    __param(0, common_1.Request()),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findOne", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put(':id'),
    __param(0, common_1.Request()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "update", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Request()),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "remove", null);
ProductController = __decorate([
    common_1.Controller('v1/backoffice/store/products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map