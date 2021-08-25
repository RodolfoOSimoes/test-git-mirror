import { UserQuestSpotifyPlaylist } from 'src/entities/user-quest-spotify-playlists.entity';
import { Connection } from 'typeorm';
export declare const userQuestSpotifyPlaylistsProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<UserQuestSpotifyPlaylist>;
    inject: string[];
}[];
