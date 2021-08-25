import { Admin } from './admin.entity';
import { Product } from './product.entity';
import { Badge } from './badge.entity';
import { UserChallenge } from './user-challenges.entity';
export declare class BadgeChallenge {
    id: number;
    name: string;
    uri: string;
    info: string;
    goal: number;
    status: boolean;
    deleted: boolean;
    admin: Admin;
    completed_users_count: number;
    total_times_of_streamings: number;
    created_at: Date;
    updated_at: Date;
    description: string;
    voucher: boolean;
    products: Product[];
    badges: Badge[];
    user_challenges: UserChallenge[];
}
