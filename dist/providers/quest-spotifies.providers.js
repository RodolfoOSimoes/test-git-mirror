"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questSpotifiesProviders = void 0;
const quest_spotifies_entity_1 = require("../entities/quest-spotifies.entity");
exports.questSpotifiesProviders = [
    {
        provide: 'QUEST_SPOTIFIES_REPOSITORY',
        useFactory: (connection) => connection.getRepository(quest_spotifies_entity_1.QuestSpotifies),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=quest-spotifies.providers.js.map