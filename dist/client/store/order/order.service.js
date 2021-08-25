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
const order_entity_1 = require("../../../entities/order.entity");
const user_entity_1 = require("../../../entities/user.entity");
const storage_service_1 = require("../../../utils/storage/storage.service");
const typeorm_1 = require("typeorm");
let OrderService = class OrderService {
    constructor(userRepository, orderRepository, storageService) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.storageService = storageService;
    }
    async findKind(user_id, kind) {
        var _a, _b;
        const user = await this.userRepository.findOne(user_id, {
            relations: ['orders', 'orders.product'],
        });
        if (kind == 'delivery') {
            const orders = (_a = user.orders
                .filter((order) => order.product.kind == 0)) === null || _a === void 0 ? void 0 : _a.sort((a, b) => b.id - a.id);
            const uniqueProductIds = [
                ...new Set(orders.map((item) => item.product.id)),
            ];
            const filteredProduct = [];
            uniqueProductIds.forEach((id) => {
                const order = orders.find((order) => order.product.id == id);
                filteredProduct.push(order.product);
            });
            const included = [];
            for (const product of filteredProduct) {
                const image = await this.storageService.getPicture('Product', product.id);
                included.push({
                    date_finish: product.date_finish,
                    date_start: product.date_start,
                    description: product.description,
                    image: image,
                    kind: 'delivery',
                    name: product.name,
                    product_activity: 'online',
                    status: product.status,
                    value: product.value,
                    id: product.code_product,
                    type: 'products',
                });
            }
            const data = orders.map((order) => {
                var _a;
                return {
                    id: order.id,
                    type: 'orders',
                    code_secret: order.code_secret,
                    kind: 'delivery',
                    created_at: order.created_at,
                    price_of_product: order.price_of_product,
                    sent: order.sent,
                    tracking_code: order.tracking_code,
                    relationships: {
                        product: {
                            id: (_a = order.product) === null || _a === void 0 ? void 0 : _a.code_product,
                            type: 'products',
                        },
                    },
                };
            });
            return {
                data,
                included,
            };
        }
        if (kind == 'coupon') {
            const orders = (_b = user.orders
                .filter((order) => order.product.kind == 1)) === null || _b === void 0 ? void 0 : _b.sort((a, b) => b.id - a.id);
            const uniqueProductIds = [
                ...new Set(orders.map((item) => item.product.id)),
            ];
            const filteredProduct = [];
            uniqueProductIds.forEach((id) => {
                const order = orders.find((order) => order.product.id == id);
                filteredProduct.push(order.product);
            });
            const included = [];
            for (const product of filteredProduct) {
                const image = await this.storageService.getPicture('Product', product.id);
                included.push({
                    date_finish: product.date_finish,
                    date_start: product.date_start,
                    description: product.description,
                    image: image,
                    kind: 'delivery',
                    name: product.name,
                    product_activity: 'online',
                    status: product.status,
                    value: product.value,
                    id: product.code_product,
                    type: 'products',
                });
            }
            const data = orders.map((order) => {
                var _a;
                return {
                    id: order.id,
                    type: 'orders',
                    code_secret: order.code_secret,
                    kind: 'coupon',
                    created_at: order.created_at,
                    price_of_product: order.price_of_product,
                    sent: order.sent,
                    tracking_code: order.tracking_code,
                    relationships: {
                        product: {
                            id: (_a = order.product) === null || _a === void 0 ? void 0 : _a.code_product,
                            type: 'products',
                        },
                    },
                };
            });
            return { data, included };
        }
        return {};
    }
    async findOne(id) {
        return await this.orderRepository.findOne(id, { relations: ['product'] });
    }
    async findTracking(tracking) {
        return await this.orderRepository.findOne({
            where: { tracking_code: tracking },
            relations: ['product'],
        });
    }
};
OrderService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('USER_REPOSITORY')),
    __param(1, common_1.Inject('ORDER_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        storage_service_1.StorageService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map