"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regionProviders = void 0;
const region_entity_1 = require("../entities/region.entity");
exports.regionProviders = [
    {
        provide: 'REGION_REPOSITORY',
        useFactory: (connection) => connection.getRepository(region_entity_1.Region),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=region.providers.js.map