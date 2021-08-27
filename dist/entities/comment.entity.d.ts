import { Admin } from './admin.entity';
export declare class Comment {
    id: number;
    body: string;
    admin: Admin;
    commentable_type: string;
    commentable_id: number;
    status: boolean;
    deleted: boolean;
    created_at: Date;
    updated_at: Date;
}
