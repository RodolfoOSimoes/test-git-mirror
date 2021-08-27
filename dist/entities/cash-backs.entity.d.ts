import { Rescue } from './rescue.entity';
import { User } from './user.entity';
export declare class CashBack {
    id: number;
    user: User;
    track_id: string;
    played_at: Date;
    name: string;
    deleted: boolean;
    rescue: Rescue;
    created_at: Date;
    updated_at: Date;
}
