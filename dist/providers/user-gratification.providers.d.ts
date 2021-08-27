import { Connection } from 'typeorm';
import { UserGratification } from '../entities/user-gratification.entity';
export declare const userGratificationProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<UserGratification>;
    inject: string[];
}[];
