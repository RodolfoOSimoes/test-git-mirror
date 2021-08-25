"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cashBackLogsProviders = void 0;
const cash_back_logs_entity_1 = require("../entities/cash-back-logs.entity");
exports.cashBackLogsProviders = [
    {
        provide: 'CASH_BACK_LOGS_REPOSITORY',
        useFactory: (connection) => connection.getRepository(cash_back_logs_entity_1.CashBackLogs),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=cash-back-logs.providers.js.map