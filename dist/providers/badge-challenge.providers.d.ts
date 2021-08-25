import { Connection } from 'typeorm';
import { BadgeChallenge } from '../entities/badge-challenge.entity';
export declare const badgeChallengeProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<BadgeChallenge>;
    inject: string[];
}[];
