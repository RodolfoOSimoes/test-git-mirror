"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const database_module_1 = require("../../database/database.module");
const user_providers_1 = require("../../providers/user.providers");
const pagination_service_1 = require("../../utils/pagination/pagination.service");
const authentication_service_1 = require("../../utils/authentication/authentication.service");
const authentication_token_providers_1 = require("../../providers/authentication-token.providers");
const storage_service_1 = require("../../utils/storage/storage.service");
const active_storage_blob_providers_1 = require("../../providers/active-storage-blob.providers");
const active_storage_attachment_providers_1 = require("../../providers/active-storage-attachment.providers");
const storage_module_1 = require("../../utils/storage/storage.module");
const quest_providers_1 = require("../../providers/quest.providers");
const settings_providers_1 = require("../../providers/settings.providers");
const order_providers_1 = require("../../providers/order.providers");
const statement_providers_1 = require("../../providers/statement.providers");
const accomplished_quest_providers_1 = require("../../providers/accomplished-quest.providers");
const extract_providers_1 = require("../../providers/extract.providers");
const city_providers_1 = require("../../providers/city.providers");
const invitation_providers_1 = require("../../providers/invitation.providers");
const campaign_providers_1 = require("../../providers/campaign.providers");
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule, storage_module_1.StorageModule],
        controllers: [user_controller_1.UserController],
        providers: [
            ...user_providers_1.userProviders,
            ...authentication_token_providers_1.authenticationTokenProviders,
            ...active_storage_blob_providers_1.activeStorageBlobProviders,
            ...active_storage_attachment_providers_1.activeStorageAttachmentProviders,
            ...quest_providers_1.questProviders,
            ...settings_providers_1.settingsProviders,
            ...order_providers_1.orderProviders,
            ...statement_providers_1.statementProviders,
            ...accomplished_quest_providers_1.accomplishedQuestProviders,
            ...extract_providers_1.extractProviders,
            ...city_providers_1.cityProviders,
            ...invitation_providers_1.invitationProviders,
            ...campaign_providers_1.campaignProviders,
            user_service_1.UserService,
            pagination_service_1.PaginationService,
            authentication_service_1.AuthenticationService,
            storage_service_1.StorageService,
        ],
        exports: [user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map