"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questSpotifyPlaylistsProviders = void 0;
const quest_spotify_playlists_entity_1 = require("../entities/quest-spotify-playlists.entity");
exports.questSpotifyPlaylistsProviders = [
    {
        provide: 'QUEST_SPOTIFY_PLAYLISTS_REPOSITORY',
        useFactory: (connection) => connection.getRepository(quest_spotify_playlists_entity_1.QuestSpotifyPlaylists),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=quest-spotify-playlists.providers.js.map