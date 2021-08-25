import { Quest } from './quest.entity';
export declare class QuestQuestions {
    id: number;
    question: string;
    answer: string;
    quest: Quest;
    created_at: Date;
    updated_at: Date;
}
