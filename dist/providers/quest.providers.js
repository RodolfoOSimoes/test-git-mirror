"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questProviders = void 0;
const quest_entity_1 = require("../entities/quest.entity");
exports.questProviders = [
    {
        provide: 'QUEST_REPOSITORY',
        useFactory: (connection) => connection.getRepository(quest_entity_1.Quest),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=quest.providers.js.map