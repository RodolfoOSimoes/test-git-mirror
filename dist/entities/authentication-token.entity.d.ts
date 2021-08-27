import { User } from './user.entity';
export declare class AuthenticationToken {
    id: number;
    body: string;
    user: User;
    last_used_at: Date;
    expires_in: number;
    ip_address: string;
    user_agent: number;
    created_at: Date;
    updated_at: Date;
}
