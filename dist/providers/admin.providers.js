"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminProviders = void 0;
const admin_entity_1 = require("../entities/admin.entity");
exports.adminProviders = [
    {
        provide: 'ADMIN_REPOSITORY',
        useFactory: (connection) => connection.getRepository(admin_entity_1.Admin),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=admin.providers.js.map