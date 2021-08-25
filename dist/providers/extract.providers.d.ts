import { Connection } from 'typeorm';
import { Extract } from '../entities/extract.entity';
export declare const extractProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<Extract>;
    inject: string[];
}[];
