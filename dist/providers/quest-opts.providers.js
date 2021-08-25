"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questOptsProviders = void 0;
const quest_opts_entity_1 = require("../entities/quest-opts.entity");
exports.questOptsProviders = [
    {
        provide: 'QUEST_OPTS_REPOSITORY',
        useFactory: (connection) => connection.getRepository(quest_opts_entity_1.QuestOpts),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=quest-opts.providers.js.map