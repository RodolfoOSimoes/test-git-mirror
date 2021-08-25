import { User } from './user.entity';
import { Campaign } from './campaign.entity';
export declare class CampaignUserBalance {
    id: number;
    user: User;
    campaign: Campaign;
    balance: number;
    deleted: boolean;
    created_at: Date;
    updated_at: Date;
}
