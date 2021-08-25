"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badgeProviders = void 0;
const badge_entity_1 = require("../entities/badge.entity");
exports.badgeProviders = [
    {
        provide: 'BADGE_REPOSITORY',
        useFactory: (connection) => connection.getRepository(badge_entity_1.Badge),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=badge.providers.js.map