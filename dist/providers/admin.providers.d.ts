import { Connection } from 'typeorm';
import { Admin } from '../entities/admin.entity';
export declare const adminProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<Admin>;
    inject: string[];
}[];
