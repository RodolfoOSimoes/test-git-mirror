import { QuestSpotifies } from 'src/entities/quest-spotifies.entity';
import { Connection } from 'typeorm';
export declare const questSpotifiesProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<QuestSpotifies>;
    inject: string[];
}[];
