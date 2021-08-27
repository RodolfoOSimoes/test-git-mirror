import { Connection } from 'typeorm';
import { Badge } from '../entities/badge.entity';
export declare const badgeProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<Badge>;
    inject: string[];
}[];
