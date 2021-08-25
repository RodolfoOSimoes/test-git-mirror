import { Connection } from 'typeorm';
import { NewsLetter } from '../entities/newsletter.entity';
export declare const newsletterProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<NewsLetter>;
    inject: string[];
}[];
