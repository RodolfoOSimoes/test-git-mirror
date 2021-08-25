import { Connection } from 'typeorm';
import { City } from '../entities/city.entity';
export declare const cityProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<City>;
    inject: string[];
}[];
