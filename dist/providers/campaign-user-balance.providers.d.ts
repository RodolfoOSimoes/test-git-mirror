import { Connection } from 'typeorm';
import { CampaignUserBalance } from '../entities/campaign-user-balance.entity';
export declare const campaignUserBalanceProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<CampaignUserBalance>;
    inject: string[];
}[];
