import { User } from './user.entity';
export declare class Withdrawal {
    id: number;
    date_spent: Date;
    user: User;
    spending: number;
    created_at: Date;
    updated_at: Date;
}
