import { Connection } from 'typeorm';
import { Quest } from '../entities/quest.entity';
export declare const questProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<Quest>;
    inject: string[];
}[];
