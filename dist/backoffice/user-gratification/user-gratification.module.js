"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGratificationModule = void 0;
const common_1 = require("@nestjs/common");
const user_gratification_service_1 = require("./user-gratification.service");
const user_gratification_controller_1 = require("./user-gratification.controller");
const database_module_1 = require("../../database/database.module");
const user_module_1 = require("../user/user.module");
const admin_module_1 = require("../admin/admin.module");
const user_gratification_providers_1 = require("../../providers/user-gratification.providers");
let UserGratificationModule = class UserGratificationModule {
};
UserGratificationModule = __decorate([
    common_1.Module({
        controllers: [user_gratification_controller_1.UserGratificationController],
        imports: [admin_module_1.AdminModule, user_module_1.UserModule, database_module_1.DatabaseModule],
        providers: [...user_gratification_providers_1.userGratificationProviders, user_gratification_service_1.UserGratificationService],
    })
], UserGratificationModule);
exports.UserGratificationModule = UserGratificationModule;
//# sourceMappingURL=user-gratification.module.js.map