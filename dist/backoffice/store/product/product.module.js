"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProductModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const product_controller_1 = require("./product.controller");
const admin_module_1 = require("../../admin/admin.module");
const database_module_1 = require("../../../database/database.module");
const product_providers_1 = require("../../../providers/product.providers");
const badge_challenge_module_1 = require("../../badge-challenge/badge-challenge.module");
const pagination_service_1 = require("../../../utils/pagination/pagination.service");
const storage_service_1 = require("../../../utils/storage/storage.service");
const active_storage_blob_providers_1 = require("../../../providers/active-storage-blob.providers");
const active_storage_attachment_providers_1 = require("../../../providers/active-storage-attachment.providers");
let ProductModule = ProductModule_1 = class ProductModule {
};
ProductModule = ProductModule_1 = __decorate([
    common_1.Module({
        controllers: [product_controller_1.ProductController],
        imports: [database_module_1.DatabaseModule, admin_module_1.AdminModule, badge_challenge_module_1.BadgeChallengeModule],
        providers: [
            ...product_providers_1.productProviders,
            ...active_storage_blob_providers_1.activeStorageBlobProviders,
            ...active_storage_attachment_providers_1.activeStorageAttachmentProviders,
            product_service_1.ProductService,
            pagination_service_1.PaginationService,
            storage_service_1.StorageService,
        ],
        exports: [ProductModule_1, product_service_1.ProductService],
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map