import { QuestYoutubes } from 'src/entities/quest-youtubes.entity';
import { Connection } from 'typeorm';
export declare const questYoutubesProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<QuestYoutubes>;
    inject: string[];
}[];
