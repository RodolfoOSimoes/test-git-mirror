import { AdminRole } from 'src/enums/AdminRoles';
import { BadgeChallenge } from './badge-challenge.entity';
import { Campaign } from './campaign.entity';
import { Comment } from './comment.entity';
import { LogSession } from './log-session.entity';
import { Product } from './product.entity';
import { Rescue } from './rescue.entity';
import { Setting } from './setting.entity';
import { UserGratification } from './user-gratification.entity';
export declare class Admin {
    id: number;
    email: string;
    password_digest: string;
    token_reset: string;
    token: string;
    lock_version: number;
    last_otp_at: Date;
    update_password_time: Date;
    otp_secret: string;
    status: boolean;
    deleted: boolean;
    created_at: Date;
    updated_at: Date;
    roles: AdminRole;
    badge_challenges: BadgeChallenge[];
    campaigns: Campaign[];
    comments: Comment[];
    products: Product[];
    rescues: Rescue[];
    settings: Setting;
    userGratifications: UserGratification[];
    log_sessions: LogSession[];
}
