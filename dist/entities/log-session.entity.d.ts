import { Admin } from './admin.entity';
export declare class LogSession {
    id: number;
    logable_type: string;
    admin: Admin;
    device: string;
    remove_ip: string;
    status: boolean;
    created_at: Date;
    updated_at: Date;
}
