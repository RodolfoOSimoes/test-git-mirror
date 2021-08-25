"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RescueModule = void 0;
const common_1 = require("@nestjs/common");
const rescue_service_1 = require("./rescue.service");
const rescue_controller_1 = require("./rescue.controller");
const rescue_providers_1 = require("../../providers/rescue.providers");
const database_module_1 = require("../../database/database.module");
const admin_module_1 = require("../admin/admin.module");
const pagination_service_1 = require("../../utils/pagination/pagination.service");
const spotify_service_1 = require("../../apis/spotify/spotify.service");
let RescueModule = class RescueModule {
};
RescueModule = __decorate([
    common_1.Module({
        controllers: [rescue_controller_1.RescueController],
        imports: [database_module_1.DatabaseModule, admin_module_1.AdminModule],
        providers: [
            ...rescue_providers_1.rescueProviders,
            rescue_service_1.RescueService,
            pagination_service_1.PaginationService,
            spotify_service_1.SpotifyService,
        ],
    })
], RescueModule);
exports.RescueModule = RescueModule;
//# sourceMappingURL=rescue.module.js.map