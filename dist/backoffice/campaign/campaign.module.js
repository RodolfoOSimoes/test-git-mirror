"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CampaignModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignModule = void 0;
const common_1 = require("@nestjs/common");
const campaign_service_1 = require("./campaign.service");
const campaign_controller_1 = require("./campaign.controller");
const campaign_providers_1 = require("../../providers/campaign.providers");
const database_module_1 = require("../../database/database.module");
const admin_module_1 = require("../admin/admin.module");
const pagination_service_1 = require("../../utils/pagination/pagination.service");
const storage_service_1 = require("../../utils/storage/storage.service");
const active_storage_blob_providers_1 = require("../../providers/active-storage-blob.providers");
const active_storage_attachment_providers_1 = require("../../providers/active-storage-attachment.providers");
let CampaignModule = CampaignModule_1 = class CampaignModule {
};
CampaignModule = CampaignModule_1 = __decorate([
    common_1.Module({
        controllers: [campaign_controller_1.CampaignController],
        imports: [database_module_1.DatabaseModule, admin_module_1.AdminModule],
        providers: [
            ...campaign_providers_1.campaignProviders,
            ...active_storage_blob_providers_1.activeStorageBlobProviders,
            ...active_storage_attachment_providers_1.activeStorageAttachmentProviders,
            campaign_service_1.CampaignService,
            pagination_service_1.PaginationService,
            storage_service_1.StorageService,
        ],
        exports: [CampaignModule_1, campaign_service_1.CampaignService],
    })
], CampaignModule);
exports.CampaignModule = CampaignModule;
//# sourceMappingURL=campaign.module.js.map