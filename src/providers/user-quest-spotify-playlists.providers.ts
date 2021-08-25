import { UserQuestSpotifyPlaylist } from 'src/entities/user-quest-spotify-playlists.entity';
import { Connection } from 'typeorm';

export const userQuestSpotifyPlaylistsProviders = [
  {
    provide: 'USER_QUEST_SPOTIFY_PLAYLISTS_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(UserQuestSpotifyPlaylist),
    inject: ['DATABASE_CONNECTION'],
  },
];
