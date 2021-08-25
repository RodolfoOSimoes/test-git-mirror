import { QuestPreSaves } from 'src/entities/quest-pre-saves.entity';
import { Connection } from 'typeorm';
export declare const questPreSavesProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<QuestPreSaves>;
    inject: string[];
}[];
