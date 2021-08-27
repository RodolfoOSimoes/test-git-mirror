import { User } from './user.entity';
import { QuestSpotifyPlaylists } from './quest-spotify-playlists.entity';
export declare class UserQuestSpotifyPlaylist {
    id: number;
    user: User;
    quest_spotify_playlists: QuestSpotifyPlaylists;
    isrcs: string;
    complete: boolean;
    question_answered: boolean;
    created_at: Date;
    updated_at: Date;
}
