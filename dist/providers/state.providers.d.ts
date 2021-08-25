import { Connection } from 'typeorm';
import { State } from '../entities/state.entity';
export declare const stateProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<State>;
    inject: string[];
}[];
