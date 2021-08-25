import { SpotifyService } from 'src/apis/spotify/spotify.service';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
export declare class SpotifyProductJob {
    private userRepository;
    private spotifyService;
    constructor(userRepository: Repository<User>, spotifyService: SpotifyService);
    handleCron(): Promise<void>;
    loadUsers(): Promise<User[]>;
}
