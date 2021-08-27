"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cashBackProviders = void 0;
const cash_backs_entity_1 = require("../entities/cash-backs.entity");
exports.cashBackProviders = [
    {
        provide: 'CASH_BACK_REPOSITORY',
        useFactory: (connection) => connection.getRepository(cash_backs_entity_1.CashBack),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=cash-backs.providers.js.map