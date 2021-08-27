"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logSessionProviders = void 0;
const log_session_entity_1 = require("../entities/log-session.entity");
exports.logSessionProviders = [
    {
        provide: 'LOG_SESSION_REPOSITORY',
        useFactory: (connection) => connection.getRepository(log_session_entity_1.LogSession),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=log-session.providers.js.map