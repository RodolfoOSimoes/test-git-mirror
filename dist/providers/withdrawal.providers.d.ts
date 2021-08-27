import { Connection } from 'typeorm';
import { Withdrawal } from '../entities/withdrawals.entity';
export declare const withdrawalProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<Withdrawal>;
    inject: string[];
}[];
