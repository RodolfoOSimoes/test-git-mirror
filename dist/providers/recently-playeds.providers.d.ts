import { Connection } from 'typeorm';
import { RecentlyPlayeds } from '../entities/recently-playeds.entity';
export declare const recentlyPlayedsProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<RecentlyPlayeds>;
    inject: string[];
}[];
