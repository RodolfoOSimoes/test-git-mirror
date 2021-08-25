"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questQuestionsProviders = void 0;
const quest_questions_entity_1 = require("../entities/quest-questions.entity");
exports.questQuestionsProviders = [
    {
        provide: 'QUEST_QUESTIONS_REPOSITORY',
        useFactory: (connection) => connection.getRepository(quest_questions_entity_1.QuestQuestions),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=quest-questions.providers.js.map