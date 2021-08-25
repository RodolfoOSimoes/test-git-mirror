import { Connection } from 'typeorm';
import { AccomplishedQuests } from '../entities/accomplished-quest.entity';
export declare const accomplishedQuestProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<AccomplishedQuests>;
    inject: string[];
}[];
