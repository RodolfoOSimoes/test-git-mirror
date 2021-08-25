import { Connection } from 'typeorm';
import { Region } from '../entities/region.entity';
export declare const regionProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<Region>;
    inject: string[];
}[];
