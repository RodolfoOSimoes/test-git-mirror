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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const product_entity_1 = require("../../../entities/product.entity");
const typeorm_1 = require("typeorm");
const storage_service_1 = require("../../../utils/storage/storage.service");
let ProductService = class ProductService {
    constructor(productsRepository, storageService) {
        this.productsRepository = productsRepository;
        this.storageService = storageService;
    }
    async findAll() {
        const products = await this.productsRepository.find({
            order: { id: 'DESC' },
            where: {
                status: true,
                deleted: false,
                badge: null,
                date_start: typeorm_1.LessThanOrEqual(new Date()),
                date_finish: typeorm_1.MoreThanOrEqual(new Date()),
            },
        });
        const images = [];
        for (const product of products) {
            const url = await this.storageService.getPicture('Product', product.id);
            images.push({
                id: product.id,
                url: url,
            });
        }
        const data = products.map((product) => {
            var _a;
            return {
                id: product.code_product,
                type: 'products',
                date_start: product.date_start,
                date_finish: product.date_finish,
                description: product.description,
                image: (_a = images.find((image) => image.id == product.id)) === null || _a === void 0 ? void 0 : _a.url,
                kind: product.kind == 0 ? 'delivery' : 'coupon',
                name: product.name,
                value: product.value,
                product_activity: product.quantities_purchased < product.quantity
                    ? 'online'
                    : 'finished',
                status: product.status,
            };
        });
        return data;
    }
    async findOne(id) {
        return await this.productsRepository.findOne(id);
    }
};
ProductService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('PRODUCT_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        storage_service_1.StorageService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map