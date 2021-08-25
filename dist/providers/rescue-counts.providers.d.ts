import { Connection } from 'typeorm';
import { RescueCount } from '../entities/rescue-counts.entity';
export declare const rescueCountsProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<RescueCount>;
    inject: string[];
}[];
