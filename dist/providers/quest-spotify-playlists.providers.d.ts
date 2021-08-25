import { QuestSpotifyPlaylists } from 'src/entities/quest-spotify-playlists.entity';
import { Connection } from 'typeorm';
export declare const questSpotifyPlaylistsProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<QuestSpotifyPlaylists>;
    inject: string[];
}[];
