"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rescueProviders = void 0;
const rescue_entity_1 = require("../entities/rescue.entity");
exports.rescueProviders = [
    {
        provide: 'RESCUE_REPOSITORY',
        useFactory: (connection) => connection.getRepository(rescue_entity_1.Rescue),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=rescue.providers.js.map