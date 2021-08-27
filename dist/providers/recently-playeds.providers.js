"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recentlyPlayedsProviders = void 0;
const recently_playeds_entity_1 = require("../entities/recently-playeds.entity");
exports.recentlyPlayedsProviders = [
    {
        provide: 'RECENTLY_PLAYEDS_REPOSITORY',
        useFactory: (connection) => connection.getRepository(recently_playeds_entity_1.RecentlyPlayeds),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=recently-playeds.providers.js.map