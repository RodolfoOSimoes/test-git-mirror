"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userQuestSpotifyPlaylistsProviders = void 0;
const user_quest_spotify_playlists_entity_1 = require("../entities/user-quest-spotify-playlists.entity");
exports.userQuestSpotifyPlaylistsProviders = [
    {
        provide: 'USER_QUEST_SPOTIFY_PLAYLISTS_REPOSITORY',
        useFactory: (connection) => connection.getRepository(user_quest_spotify_playlists_entity_1.UserQuestSpotifyPlaylist),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=user-quest-spotify-playlists.providers.js.map