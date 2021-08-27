import { User } from './user.entity';
import { QuestPreSaves } from './quest-pre-saves.entity';
export declare class PreSaveUser {
    id: number;
    user: User;
    quest_pre_save: QuestPreSaves;
    saved: boolean;
    created_at: Date;
    updated_at: Date;
}
