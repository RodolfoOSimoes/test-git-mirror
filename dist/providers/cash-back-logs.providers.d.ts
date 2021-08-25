import { Connection } from 'typeorm';
import { CashBackLogs } from '../entities/cash-back-logs.entity';
export declare const cashBackLogsProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<CashBackLogs>;
    inject: string[];
}[];
