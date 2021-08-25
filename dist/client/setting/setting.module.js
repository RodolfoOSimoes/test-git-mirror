"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingModule = void 0;
const common_1 = require("@nestjs/common");
const setting_service_1 = require("./setting.service");
const setting_controller_1 = require("./setting.controller");
const database_module_1 = require("../../database/database.module");
const settings_providers_1 = require("../../providers/settings.providers");
const campaign_providers_1 = require("../../providers/campaign.providers");
const storage_service_1 = require("../../utils/storage/storage.service");
const active_storage_blob_providers_1 = require("../../providers/active-storage-blob.providers");
const active_storage_attachment_providers_1 = require("../../providers/active-storage-attachment.providers");
let SettingModule = class SettingModule {
};
SettingModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule],
        controllers: [setting_controller_1.SettingController],
        providers: [
            ...settings_providers_1.settingsProviders,
            ...campaign_providers_1.campaignProviders,
            ...active_storage_blob_providers_1.activeStorageBlobProviders,
            ...active_storage_attachment_providers_1.activeStorageAttachmentProviders,
            setting_service_1.SettingService,
            storage_service_1.StorageService,
        ],
    })
], SettingModule);
exports.SettingModule = SettingModule;
//# sourceMappingURL=setting.module.js.map