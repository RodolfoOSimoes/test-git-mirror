"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const admin_controller_1 = require("./admin.controller");
const admin_providers_1 = require("../../providers/admin.providers");
const database_module_1 = require("../../database/database.module");
const mfa_service_1 = require("../../utils/mfa/mfa.service");
const pagination_service_1 = require("../../utils/pagination/pagination.service");
const user_providers_1 = require("../../providers/user.providers");
const bull_1 = require("@nestjs/bull");
const sendMail_producer_service_1 = require("../../jobs/producers/sendMail-producer-service");
let AdminModule = class AdminModule {
};
AdminModule = __decorate([
    common_1.Module({
        imports: [
            database_module_1.DatabaseModule,
            bull_1.BullModule.registerQueue({
                name: 'sendMail-queue',
            }),
        ],
        controllers: [admin_controller_1.AdminController],
        providers: [
            ...admin_providers_1.adminProviders,
            ...user_providers_1.userProviders,
            admin_service_1.AdminService,
            mfa_service_1.MfaService,
            sendMail_producer_service_1.SendMailProducerService,
            pagination_service_1.PaginationService,
        ],
        exports: [admin_service_1.AdminService],
    })
], AdminModule);
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map