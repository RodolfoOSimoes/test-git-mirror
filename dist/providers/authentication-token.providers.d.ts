import { Connection } from 'typeorm';
import { AuthenticationToken } from '../entities/authentication-token.entity';
export declare const authenticationTokenProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<AuthenticationToken>;
    inject: string[];
}[];
