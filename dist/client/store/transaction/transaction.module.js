"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModule = void 0;
const common_1 = require("@nestjs/common");
const transaction_service_1 = require("./transaction.service");
const transaction_controller_1 = require("./transaction.controller");
const database_module_1 = require("../../../database/database.module");
const user_providers_1 = require("../../../providers/user.providers");
const statement_providers_1 = require("../../../providers/statement.providers");
const address_providers_1 = require("../../../providers/address.providers");
const order_providers_1 = require("../../../providers/order.providers");
const product_providers_1 = require("../../../providers/product.providers");
const sendMail_producer_service_1 = require("../../../jobs/producers/sendMail-producer-service");
const bull_1 = require("@nestjs/bull");
const withdrawal_providers_1 = require("../../../providers/withdrawal.providers");
const campaign_providers_1 = require("../../../providers/campaign.providers");
let TransactionModule = class TransactionModule {
};
TransactionModule = __decorate([
    common_1.Module({
        imports: [
            database_module_1.DatabaseModule,
            bull_1.BullModule.registerQueue({
                name: 'sendMail-queue',
            }),
        ],
        controllers: [transaction_controller_1.TransactionController],
        providers: [
            ...user_providers_1.userProviders,
            ...statement_providers_1.statementProviders,
            ...address_providers_1.addressProviders,
            ...order_providers_1.orderProviders,
            ...product_providers_1.productProviders,
            ...withdrawal_providers_1.withdrawalProviders,
            ...campaign_providers_1.campaignProviders,
            transaction_service_1.TransactionService,
            sendMail_producer_service_1.SendMailProducerService,
        ],
    })
], TransactionModule);
exports.TransactionModule = TransactionModule;
//# sourceMappingURL=transaction.module.js.map