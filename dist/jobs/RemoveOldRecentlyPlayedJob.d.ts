import { RecentlyPlayeds } from 'src/entities/recently-playeds.entity';
import { Repository } from 'typeorm';
export declare class RemoveOldRecentlyPlayedJob {
    private recentlyPlayedRepository;
    constructor(recentlyPlayedRepository: Repository<RecentlyPlayeds>);
    handleCron(): Promise<void>;
    getDate(): string;
}
