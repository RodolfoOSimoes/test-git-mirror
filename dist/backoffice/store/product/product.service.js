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
const admin_service_1 = require("../../admin/admin.service");
const badge_challenge_service_1 = require("../../badge-challenge/badge-challenge.service");
const pagination_service_1 = require("../../../utils/pagination/pagination.service");
const typeorm_1 = require("typeorm");
const code_utils_1 = require("../../../utils/code.utils");
const storage_service_1 = require("../../../utils/storage/storage.service");
let ProductService = class ProductService {
    constructor(productRepository, adminService, badgeChallengeService, paginationService, storageService) {
        this.productRepository = productRepository;
        this.adminService = adminService;
        this.badgeChallengeService = badgeChallengeService;
        this.paginationService = paginationService;
        this.storageService = storageService;
    }
    async create(admin_id, dto) {
        const admin = await this.adminService.findById(admin_id);
        const { product } = dto;
        const newProduct = await this.productRepository.save({
            admin: admin,
            code_product: code_utils_1.generateCode(11),
            name: product.name,
            value: product.value,
            date_start: product.date_start,
            date_finish: product.date_finish,
            status: product.status,
            deleted: false,
            quantity: product.quantity,
            quantities_purchased: 0,
            lock_version: 1,
            created_at: new Date(),
            updated_at: new Date(),
            kind: product.kind,
            description: product.description,
        });
        if (product.image && product.image.data) {
            await this.storageService.createPic(product.image.data, newProduct.id, 'Product');
        }
        return { message: 'Produto criado com sucesso.' };
    }
    async findAll(page = 1) {
        var _a;
        const limit = 10;
        const count = await this.productRepository.count({
            where: { deleted: false },
        });
        const data = (_a = (await this.productRepository.find({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                id: 'DESC',
            },
            where: {
                deleted: false,
            },
        }))) === null || _a === void 0 ? void 0 : _a.map((product) => this.productMapper(product));
        return {
            data,
            currentPage: page,
            size: Math.ceil(count / limit),
            links: this.paginationService.pagination('v1/backoffice/store/products', page, limit, count),
        };
    }
    async findOne(id) {
        return await this.productRepository.findOne(id);
    }
    async update(admin_id, id, dto) {
        const admin = await this.adminService.findById(admin_id);
        const { product } = dto;
        await this.productRepository.update(id, {
            admin: admin,
            name: product.name,
            value: product.value,
            date_start: product.date_start,
            date_finish: product.date_finish,
            status: product.status,
            quantity: product.quantity,
            updated_at: new Date(),
            kind: product.kind,
            description: product.description,
        });
        if (product.image && product.image.data) {
            await this.storageService.updatePic(product.image.data, id, 'Product');
        }
        return { message: 'Produto atualizado com sucesso.' };
    }
    async remove(id) {
        await this.productRepository.update(id, {
            deleted: true,
        });
        return { message: 'Produto deletado com sucesso.' };
    }
    productMapper(product) {
        return {
            id: product.id,
            name: product.name,
            value: product.value,
            quantity: product.quantity,
            date_start: product.date_start,
            status: product.status,
        };
    }
};
ProductService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('PRODUCT_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        admin_service_1.AdminService,
        badge_challenge_service_1.BadgeChallengeService,
        pagination_service_1.PaginationService,
        storage_service_1.StorageService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map