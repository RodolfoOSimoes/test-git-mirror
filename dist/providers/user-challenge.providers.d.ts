import { Connection } from 'typeorm';
import { UserChallenge } from '../entities/user-challenges.entity';
export declare const userChallengeProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<UserChallenge>;
    inject: string[];
}[];
