import { Quest } from './quest.entity';
import { UserQuestSpotifyPlaylist } from './user-quest-spotify-playlists.entity';
export declare class QuestSpotifyPlaylists {
    id: number;
    uri: string;
    tracks_count: number;
    points_for_track: number;
    isrcs: string;
    quest: Quest;
    question: string;
    points_for_question: number;
    answer: string;
    question_2: string;
    answer_2: string;
    points_for_question_2: number;
    created_at: Date;
    updated_at: Date;
    name: string;
    cover_url: string;
    user_quest_spotify_playlists: UserQuestSpotifyPlaylist[];
}
