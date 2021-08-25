"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rescueCountsProviders = void 0;
const rescue_counts_entity_1 = require("../entities/rescue-counts.entity");
exports.rescueCountsProviders = [
    {
        provide: 'RESCUE_COUNT_REPOSITORY',
        useFactory: (connection) => connection.getRepository(rescue_counts_entity_1.RescueCount),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=rescue-counts.providers.js.map