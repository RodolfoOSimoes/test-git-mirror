import { QuestOpts } from 'src/entities/quest-opts.entity';
import { Connection } from 'typeorm';
export declare const questOptsProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<QuestOpts>;
    inject: string[];
}[];
