import { User } from './user.entity';
export declare class RecentlyPlayeds {
    id: number;
    user: User;
    content: string;
    checked_in: Date;
    created_at: Date;
    updated_at: Date;
    listen_times: number;
}
