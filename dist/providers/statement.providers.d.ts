import { Connection } from 'typeorm';
import { Statement } from '../entities/statement.entity';
export declare const statementProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<Statement>;
    inject: string[];
}[];
