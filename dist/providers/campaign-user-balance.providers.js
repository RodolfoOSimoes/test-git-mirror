"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.campaignUserBalanceProviders = void 0;
const campaign_user_balance_entity_1 = require("../entities/campaign-user-balance.entity");
exports.campaignUserBalanceProviders = [
    {
        provide: 'CAMPAIGN_USER_BALANCE_REPOSITORY',
        useFactory: (connection) => connection.getRepository(campaign_user_balance_entity_1.CampaignUserBalance),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=campaign-user-balance.providers.js.map