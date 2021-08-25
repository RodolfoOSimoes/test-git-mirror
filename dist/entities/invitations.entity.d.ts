import { User } from './user.entity';
export declare class Invitation {
    id: number;
    user_guest_id: number;
    user: User;
    created_at: Date;
    updated_at: Date;
}
