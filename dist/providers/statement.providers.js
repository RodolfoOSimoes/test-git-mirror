"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statementProviders = void 0;
const statement_entity_1 = require("../entities/statement.entity");
exports.statementProviders = [
    {
        provide: 'STATEMENT_REPOSITORY',
        useFactory: (connection) => connection.getRepository(statement_entity_1.Statement),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=statement.providers.js.map