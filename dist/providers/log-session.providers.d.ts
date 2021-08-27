import { Connection } from 'typeorm';
import { LogSession } from '../entities/log-session.entity';
export declare const logSessionProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<LogSession>;
    inject: string[];
}[];
