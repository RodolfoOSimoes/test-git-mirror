"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountProviderProviders = void 0;
const account_provider_entity_1 = require("../entities/account-provider.entity");
exports.AccountProviderProviders = [
    {
        provide: 'ACCOUNT_PROVIDER_REPOSITORY',
        useFactory: (connection) => connection.getRepository(account_provider_entity_1.AccountProvider),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=account-provider.providers.js.map