"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashBackModule = void 0;
const common_1 = require("@nestjs/common");
const cash_back_service_1 = require("./cash-back.service");
const cash_back_controller_1 = require("./cash-back.controller");
const user_providers_1 = require("../../providers/user.providers");
const cash_backs_providers_1 = require("../../providers/cash-backs.providers");
const database_module_1 = require("../../database/database.module");
const rescue_providers_1 = require("../../providers/rescue.providers");
let CashBackModule = class CashBackModule {
};
CashBackModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule],
        controllers: [cash_back_controller_1.CashBackController],
        providers: [
            ...user_providers_1.userProviders,
            ...cash_backs_providers_1.cashBackProviders,
            ...rescue_providers_1.rescueProviders,
            cash_back_service_1.CashBackService,
        ],
    })
], CashBackModule);
exports.CashBackModule = CashBackModule;
//# sourceMappingURL=cash-back.module.js.map