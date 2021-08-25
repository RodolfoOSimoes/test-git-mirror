import { Connection } from 'typeorm';
import { Rescue } from '../entities/rescue.entity';
export declare const rescueProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<Rescue>;
    inject: string[];
}[];
