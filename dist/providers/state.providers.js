"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateProviders = void 0;
const state_entity_1 = require("../entities/state.entity");
exports.stateProviders = [
    {
        provide: 'STATE_REPOSITORY',
        useFactory: (connection) => connection.getRepository(state_entity_1.State),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=state.providers.js.map