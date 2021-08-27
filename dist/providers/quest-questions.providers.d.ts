import { QuestQuestions } from 'src/entities/quest-questions.entity';
import { Connection } from 'typeorm';
export declare const questQuestionsProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<QuestQuestions>;
    inject: string[];
}[];
