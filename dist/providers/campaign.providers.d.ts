import { Connection } from 'typeorm';
import { Campaign } from '../entities/campaign.entity';
export declare const campaignProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<Campaign>;
    inject: string[];
}[];
