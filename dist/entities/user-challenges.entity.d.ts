import { User } from './user.entity';
import { BadgeChallenge } from './badge-challenge.entity';
export declare class UserChallenge {
    id: number;
    user: User;
    badge_challenge: BadgeChallenge;
    times: number;
    completed: boolean;
    created_at: Date;
    updated_at: Date;
}
