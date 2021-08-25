import { QuestSpotifyPlaylists } from 'src/entities/quest-spotify-playlists.entity';
import { Connection } from 'typeorm';

export const questSpotifyPlaylistsProviders = [
  {
    provide: 'QUEST_SPOTIFY_PLAYLISTS_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(QuestSpotifyPlaylists),
    inject: ['DATABASE_CONNECTION'],
  },
];
