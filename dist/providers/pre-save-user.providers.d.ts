import { PreSaveUser } from 'src/entities/pre-save-users.entity';
import { Connection } from 'typeorm';
export declare const preSaveUsersProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<PreSaveUser>;
    inject: string[];
}[];
