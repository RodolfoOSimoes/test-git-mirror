import { Admin } from './admin.entity';
import { Statement } from './statement.entity';
import { CampaignUserBalance } from './campaign-user-balance.entity';
export declare class Campaign {
    id: number;
    name: string;
    slug: string;
    date_finish: Date;
    status: boolean;
    deleted: boolean;
    admin: Admin;
    created_at: Date;
    updated_at: Date;
    users_count: number;
    date_start: Date;
    statements: Statement[];
    campaign_user_balances: CampaignUserBalance[];
}
