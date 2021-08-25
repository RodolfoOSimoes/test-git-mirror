import { Quest } from './quest.entity';
import { PreSaveUser } from './pre-save-users.entity';
export declare class QuestPreSaves {
    id: number;
    uri: string;
    name_artist: string;
    name_product: string;
    launch_in: Date;
    quest: Quest;
    created_at: Date;
    updated_at: Date;
    pre_save_users: PreSaveUser[];
}
