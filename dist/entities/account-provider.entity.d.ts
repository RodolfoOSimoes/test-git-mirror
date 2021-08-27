import { User } from './user.entity';
export declare class AccountProvider {
    id: number;
    user: User;
    provider: string;
    uid: string;
    credentials: string;
    info: string;
    extra_info: string;
    created_at: Date;
    updated_at: Date;
}
