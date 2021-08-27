import { Connection } from 'typeorm';
import { Setting } from '../entities/setting.entity';
export declare const settingsProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<Setting>;
    inject: string[];
}[];
