"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questPreSavesProviders = void 0;
const quest_pre_saves_entity_1 = require("../entities/quest-pre-saves.entity");
exports.questPreSavesProviders = [
    {
        provide: 'QUEST_PRE_SAVES_REPOSITORY',
        useFactory: (connection) => connection.getRepository(quest_pre_saves_entity_1.QuestPreSaves),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=quest-pre-saves.providers%20.js.map