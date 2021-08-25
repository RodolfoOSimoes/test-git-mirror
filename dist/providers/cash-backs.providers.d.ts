import { Connection } from 'typeorm';
import { CashBack } from '../entities/cash-backs.entity';
export declare const cashBackProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<CashBack>;
    inject: string[];
}[];
