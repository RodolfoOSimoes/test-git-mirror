"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractProviders = void 0;
const extract_entity_1 = require("../entities/extract.entity");
exports.extractProviders = [
    {
        provide: 'EXTRACT_REPOSITORY',
        useFactory: (connection) => connection.getRepository(extract_entity_1.Extract),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=extract.providers.js.map