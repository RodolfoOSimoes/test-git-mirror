import { Campaign } from './campaign.entity';
import { User } from './user.entity';
export declare class Statement {
    id: number;
    user: User;
    campaign: Campaign;
    amount: number;
    kind: number;
    balance: number;
    statementable_type: string;
    statementable_id: number;
    deleted: boolean;
    created_at: Date;
    updated_at: Date;
    code_doc: string;
    statementable_type_action: number;
    expiration_date: Date;
}
