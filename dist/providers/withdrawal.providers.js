"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawalProviders = void 0;
const withdrawals_entity_1 = require("../entities/withdrawals.entity");
exports.withdrawalProviders = [
    {
        provide: 'WITHDRAWAL_REPOSITORY',
        useFactory: (connection) => connection.getRepository(withdrawals_entity_1.Withdrawal),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=withdrawal.providers.js.map