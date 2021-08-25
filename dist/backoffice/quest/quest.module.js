"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestModule = void 0;
const common_1 = require("@nestjs/common");
const quest_service_1 = require("./quest.service");
const quest_controller_1 = require("./quest.controller");
const admin_module_1 = require("../admin/admin.module");
const database_module_1 = require("../../database/database.module");
const pagination_service_1 = require("../../utils/pagination/pagination.service");
const quest_providers_1 = require("../../providers/quest.providers");
const quest_opts_providers_1 = require("../../providers/quest-opts.providers");
const quest_pre_saves_providers_1 = require("../../providers/quest-pre-saves.providers ");
let QuestModule = class QuestModule {
};
QuestModule = __decorate([
    common_1.Module({
        controllers: [quest_controller_1.QuestController],
        providers: [
            ...quest_providers_1.questProviders,
            ...quest_opts_providers_1.questOptsProviders,
            ...quest_pre_saves_providers_1.questPreSavesProviders,
            quest_service_1.QuestService,
            pagination_service_1.PaginationService,
        ],
        imports: [database_module_1.DatabaseModule, admin_module_1.AdminModule],
    })
], QuestModule);
exports.QuestModule = QuestModule;
//# sourceMappingURL=quest.module.js.map