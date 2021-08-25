import { QuestQuestions } from 'src/entities/quest-questions.entity';
import { Connection } from 'typeorm';

export const questQuestionsProviders = [
  {
    provide: 'QUEST_QUESTIONS_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(QuestQuestions),
    inject: ['DATABASE_CONNECTION'],
  },
];
