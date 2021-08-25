import { User } from './user.entity';
import { Rescue } from './rescue.entity';
export declare class RescueCount {
    id: number;
    user: User;
    rescue: Rescue;
    times: number;
    created_date: Date;
    created_at: Date;
    updated_at: Date;
}
