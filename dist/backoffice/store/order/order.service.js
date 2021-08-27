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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../user/user.service");
const typeorm_1 = require("typeorm");
const product_service_1 = require("../product/product.service");
let OrderService = class OrderService {
    constructor(orderRepository, userService, productService) {
        this.orderRepository = orderRepository;
        this.userService = userService;
        this.productService = productService;
    }
    async validate_coupon(coupon_id) {
        const order = await this.orderRepository.findOne({
            tracking_code: coupon_id.toString(),
        });
        return order
            ? { message: 'Cupom válido.' }
            : { message: 'Cupom inválido.' };
    }
    async findAll(page = 1) {
        const limit = 10;
        return await this.orderRepository.find({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                id: 'DESC',
            },
        });
    }
    async findOne(id) {
        return await this.orderRepository.findOne(id);
    }
    async update(id, dto) {
        const product = await this.productService.findOne(dto.order.product_id);
        const user = await this.userService.findOne(dto.order.user_id);
        await this.orderRepository.update(id, Object.assign(Object.assign({}, dto.order), { user: user, product: product }));
        return { message: 'Ordem atualizada com sucesso.' };
    }
    async remove(id) {
        return { message: 'Ordem deletado com sucesso.' };
    }
};
OrderService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('ORDER_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        user_service_1.UserService,
        product_service_1.ProductService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map