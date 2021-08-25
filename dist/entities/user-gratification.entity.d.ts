import { Admin } from './admin.entity';
import { User } from './user.entity';
export declare class UserGratification {
    id: number;
    score: number;
    user: User;
    admin: Admin;
    deleted: boolean;
    kind: number;
    is_cashback: boolean;
    created_at: Date;
    updated_at: Date;
}
