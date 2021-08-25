"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accomplishedQuestProviders = void 0;
const accomplished_quest_entity_1 = require("../entities/accomplished-quest.entity");
exports.accomplishedQuestProviders = [
    {
        provide: 'ACCOMPLISHED_QUEST_REPOSITORY',
        useFactory: (connection) => connection.getRepository(accomplished_quest_entity_1.AccomplishedQuests),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=accomplished-quest.providers.js.map