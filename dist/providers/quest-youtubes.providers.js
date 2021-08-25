"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questYoutubesProviders = void 0;
const quest_youtubes_entity_1 = require("../entities/quest-youtubes.entity");
exports.questYoutubesProviders = [
    {
        provide: 'QUEST_YOUTUBES_REPOSITORY',
        useFactory: (connection) => connection.getRepository(quest_youtubes_entity_1.QuestYoutubes),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=quest-youtubes.providers.js.map