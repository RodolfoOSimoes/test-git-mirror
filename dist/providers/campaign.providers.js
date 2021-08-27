"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.campaignProviders = void 0;
const campaign_entity_1 = require("../entities/campaign.entity");
exports.campaignProviders = [
    {
        provide: 'CAMPAIGN_REPOSITORY',
        useFactory: (connection) => connection.getRepository(campaign_entity_1.Campaign),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=campaign.providers.js.map