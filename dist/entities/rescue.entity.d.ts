import { Admin } from './admin.entity';
import { CashBack } from './cash-backs.entity';
import { RescueCount } from './rescue-counts.entity';
export declare class Rescue {
    id: number;
    uri: string;
    uid: string;
    name: string;
    artists: string;
    cover_url: string;
    score: number;
    admin: Admin;
    status: boolean;
    deleted: boolean;
    created_at: Date;
    updated_at: Date;
    rescues_count: number;
    priority: number;
    isrc: string;
    playlist: string;
    info_playlist: string;
    limited: boolean;
    limit_streams: number;
    cashbacks: CashBack[];
    rescue_counts: RescueCount[];
}
