import { Connection } from 'typeorm';
import { FriendlyIdSlug } from '../entities/friendly-id-slugs.entity';
export declare const friendlyIdSlugProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<FriendlyIdSlug>;
    inject: string[];
}[];
