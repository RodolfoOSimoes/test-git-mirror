import { User } from './user.entity';
export declare class CashBackLogs {
    id: number;
    user: User;
    track_id: string;
    played_at: Date;
    name: string;
    deleted: boolean;
    created_at: Date;
    updated_at: Date;
}
