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
const order_providers_1 = require("../../../../providers/order.providers");
const user_providers_1 = require("../../../../providers/user.providers");
const admin_module_1 = require("../../../admin/admin.module");
const database_module_1 = require("../../../../database/database.module");
const pagination_service_1 = require("../../../../utils/pagination/pagination.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        controllers: [user_controller_1.UserController],
        imports: [database_module_1.DatabaseModule, admin_module_1.AdminModule],
        providers: [
            ...order_providers_1.orderProviders,
            ...user_providers_1.userProviders,
            user_service_1.UserService,
            pagination_service_1.PaginationService,
        ],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map