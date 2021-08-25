"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeModule = void 0;
const common_1 = require("@nestjs/common");
const badge_service_1 = require("./badge.service");
const badge_controller_1 = require("./badge.controller");
const database_module_1 = require("../../database/database.module");
const user_providers_1 = require("../../providers/user.providers");
let BadgeModule = class BadgeModule {
};
BadgeModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule],
        controllers: [badge_controller_1.BadgeController],
        providers: [...user_providers_1.userProviders, badge_service_1.BadgeService],
    })
], BadgeModule);
exports.BadgeModule = BadgeModule;
//# sourceMappingURL=badge.module.js.map