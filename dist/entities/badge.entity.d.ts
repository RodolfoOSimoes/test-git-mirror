import { BadgeChallenge } from './badge-challenge.entity';
import { User } from './user.entity';
export declare class Badge {
    id: number;
    user: User;
    kind: number;
    times: number;
    created_at: Date;
    updated_at: Date;
    badge_challenge: BadgeChallenge;
}
