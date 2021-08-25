import { Quest } from './quest.entity';
import { User } from './user.entity';
export declare class AccomplishedQuests {
    id: number;
    quest: Quest;
    user: User;
    created_at: Date;
    updated_at: Date;
}
