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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const pagination_service_1 = require("../../../../utils/pagination/pagination.service");
const typeorm_1 = require("typeorm");
let UserService = class UserService {
    constructor(orderRepository, userRepository, paginationService) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.paginationService = paginationService;
    }
    async findAll(page = 1) {
        const limit = 20;
        const [result] = await this.orderRepository.query('select count(DISTINCT(user_id)) as count from orders');
        const orders = await this.orderRepository.find({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                id: 'DESC',
            },
            relations: ['product', 'user', 'address'],
        });
        const uniqueUserRelations = [
            ...new Set(orders.map((item) => item.user.id)),
        ];
        const users = [];
        uniqueUserRelations.forEach((user_id) => {
            const order = orders.find((order) => order.user.id === user_id);
            if (!order.user.deleted) {
                users.push(order.user);
            }
        });
        const data = orders.map((order) => {
            return {
                id: order.id,
                type: 'orders',
                created_at: order.created_at,
                price_of_product: order.product.value,
                sent: order.sent,
                tracking_code: order.tracking_code,
                relationships: {
                    address: {
                        id: order.address.id,
                        type: 'addresses',
                    },
                    product: {
                        id: order.product.id,
                        type: 'products',
                    },
                    user: {
                        id: order.user.id,
                        type: 'users',
                    },
                },
            };
        });
        const included = users === null || users === void 0 ? void 0 : users.map((user) => {
            return {
                id: user.id,
                type: 'users',
                email: user.email,
                name: user.name,
            };
        });
        return {
            data: data,
            included: included,
            currentPage: page,
            size: Math.ceil(result.count / limit),
            links: this.paginationService.pagination('v1/backoffice/store/orders/users', page, limit, result.count),
        };
    }
    async findOne(id) {
        const user = await this.userRepository.findOne(id);
        return await this.orderRepository.find({
            where: { user: user },
            order: { id: 'DESC' },
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('ORDER_REPOSITORY')),
    __param(1, common_1.Inject('USER_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        pagination_service_1.PaginationService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map