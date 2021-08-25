"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestYoutubesFactory = exports.QuestSpotifyPlaylistsFactory = exports.QuestSpotifiesFactory = exports.QuestQuestionsFactory = exports.QuestPreSavesFactory = exports.QuestOptsFactory = exports.QuestBuildService = void 0;
const spotify_service_1 = require("../../apis/spotify/spotify.service");
const youtube_service_1 = require("../../apis/youtube/youtube.service");
const admin_entity_1 = require("../../entities/admin.entity");
const quest_opts_entity_1 = require("../../entities/quest-opts.entity");
const quest_pre_saves_entity_1 = require("../../entities/quest-pre-saves.entity");
const quest_questions_entity_1 = require("../../entities/quest-questions.entity");
const quest_spotifies_entity_1 = require("../../entities/quest-spotifies.entity");
const quest_spotify_playlists_entity_1 = require("../../entities/quest-spotify-playlists.entity");
const quest_youtubes_entity_1 = require("../../entities/quest-youtubes.entity");
const quest_entity_1 = require("../../entities/quest.entity");
class QuestBuildService {
    async buildQuest(dto, admin) {
        const { quest_kind } = dto.quest;
        const { quest } = dto;
        let newQuest = new quest_entity_1.Quest();
        newQuest.admin = admin;
        newQuest.status = quest.status;
        newQuest.score = quest.score;
        newQuest.created_at = new Date();
        newQuest.updated_at = new Date();
        newQuest.date_start = quest.date_start;
        newQuest.accomplished_count = 0;
        switch (quest_kind) {
            case 'quest_spotify':
                newQuest = await new QuestSpotifiesFactory().buildQuest(newQuest, dto);
                break;
            case 'quest_question':
                newQuest = await new QuestQuestionsFactory().buildQuest(newQuest, dto);
                break;
            case 'quest_youtube':
                newQuest = await new QuestYoutubesFactory().buildQuest(newQuest, dto);
                break;
            case 'quest_pre_save':
                newQuest = await new QuestPreSavesFactory().buildQuest(newQuest, dto);
                break;
            case 'quest_opt':
                newQuest = await new QuestOptsFactory().buildQuest(newQuest, dto);
                break;
            case 'quest_spotify_playlist':
                newQuest = await new QuestSpotifyPlaylistsFactory().buildQuest(newQuest, dto);
                break;
        }
        return newQuest;
    }
}
exports.QuestBuildService = QuestBuildService;
class QuestOptsFactory {
    async buildQuest(quest, dto) {
        const questType = new quest_opts_entity_1.QuestOpts();
        questType.description = dto.quest.quest_opt_attributes.description;
        questType.created_at = new Date();
        questType.updated_at = new Date();
        quest.quest_opts = questType;
        quest.kind = 11;
        return quest;
    }
}
exports.QuestOptsFactory = QuestOptsFactory;
class QuestPreSavesFactory {
    async buildQuest(quest, dto) {
        const questType = new quest_pre_saves_entity_1.QuestPreSaves();
        questType.uri = dto.quest.quest_pre_save_attributes.uri;
        questType.launch_in = dto.quest.quest_pre_save_attributes.launch_in;
        questType.name_artist = dto.quest.quest_pre_save_attributes.name_artist;
        questType.name_product = dto.quest.quest_pre_save_attributes.name_product;
        questType.created_at = new Date();
        questType.updated_at = new Date();
        quest.quest_pre_saves = questType;
        quest.kind = 10;
        return quest;
    }
}
exports.QuestPreSavesFactory = QuestPreSavesFactory;
class QuestQuestionsFactory {
    async buildQuest(quest, dto) {
        const questType = new quest_questions_entity_1.QuestQuestions();
        questType.question = dto.quest.quest_question_attributes.question;
        questType.answer = dto.quest.quest_question_attributes.answer;
        questType.created_at = new Date();
        questType.updated_at = new Date();
        quest.quest_questions = questType;
        quest.kind = 5;
        return quest;
    }
}
exports.QuestQuestionsFactory = QuestQuestionsFactory;
class QuestSpotifiesFactory {
    async buildQuest(quest, dto) {
        var _a, _b;
        const spotifyService = new spotify_service_1.SpotifyService();
        const questType = new quest_spotifies_entity_1.QuestSpotifies();
        questType.created_at = new Date();
        questType.updated_at = new Date();
        questType.to_listen = dto.quest.quest_spotify_attributes.to_listen;
        questType.uri = dto.quest.quest_spotify_attributes.uri;
        questType.uid = dto.quest.quest_spotify_attributes.uri.split(':')[2];
        if (dto.quest.quest_spotify_attributes.uri.indexOf('artist') != -1) {
            const artist = await spotifyService.getArtistInfo(questType.uid);
            questType.name = artist === null || artist === void 0 ? void 0 : artist.name;
            quest.kind = 0;
            questType.kind = 1;
        }
        else if (dto.quest.quest_spotify_attributes.uri.indexOf('playlist') != -1) {
            const playlist = await spotifyService.getPlaylistName(questType.uid);
            questType.name = playlist === null || playlist === void 0 ? void 0 : playlist.name;
            quest.kind = 1;
            questType.kind = 0;
        }
        else if (dto.quest.quest_spotify_attributes.uri.indexOf('track') != -1 &&
            !dto.quest.quest_spotify_attributes.to_listen) {
            const track = await spotifyService.getTrackInfo(questType.uid);
            questType.name = track === null || track === void 0 ? void 0 : track.name;
            questType.isrc = (_a = track === null || track === void 0 ? void 0 : track.external_ids) === null || _a === void 0 ? void 0 : _a.isrc;
            quest.kind = 2;
            questType.kind = 3;
        }
        else if (dto.quest.quest_spotify_attributes.uri.indexOf('album') != -1) {
            const almum = await spotifyService.getAlbumInfo(questType.uid);
            questType.name = almum === null || almum === void 0 ? void 0 : almum.name;
            quest.kind = 3;
            questType.kind = 2;
        }
        else if (dto.quest.quest_spotify_attributes.uri.indexOf('track') != -1 &&
            dto.quest.quest_spotify_attributes.to_listen) {
            const track = await spotifyService.getTrackInfo(questType.uid);
            questType.name = track === null || track === void 0 ? void 0 : track.name;
            questType.isrc = (_b = track === null || track === void 0 ? void 0 : track.external_ids) === null || _b === void 0 ? void 0 : _b.isrc;
            quest.kind = 4;
            questType.kind = 3;
        }
        quest.quest_spotifies = questType;
        return quest;
    }
}
exports.QuestSpotifiesFactory = QuestSpotifiesFactory;
class QuestSpotifyPlaylistsFactory {
    async buildQuest(quest, dto) {
        var _a;
        const questType = new quest_spotify_playlists_entity_1.QuestSpotifyPlaylists();
        const spotifyService = new spotify_service_1.SpotifyService();
        questType.uri = dto.quest.quest_spotify_playlist_attributes.uri;
        questType.points_for_question =
            dto.quest.quest_spotify_playlist_attributes.points_for_question;
        questType.question = dto.quest.quest_spotify_playlist_attributes.question;
        questType.answer = dto.quest.quest_spotify_playlist_attributes.answer;
        questType.points_for_question_2 =
            dto.quest.quest_spotify_playlist_attributes.points_for_question_2;
        questType.question_2 =
            dto.quest.quest_spotify_playlist_attributes.question_2;
        questType.answer_2 = dto.quest.quest_spotify_playlist_attributes.answer_2;
        questType.points_for_track =
            dto.quest.quest_spotify_playlist_attributes.points_for_track;
        questType.tracks_count =
            dto.quest.quest_spotify_playlist_attributes.tracks_count;
        quest.score =
            dto.quest.quest_spotify_playlist_attributes.points_for_track *
                dto.quest.quest_spotify_playlist_attributes.tracks_count;
        const playlist = await spotifyService.getPlaylistInfo(questType.uri.split('playlist:')[1]);
        questType.cover_url = (_a = playlist === null || playlist === void 0 ? void 0 : playlist.images[0]) === null || _a === void 0 ? void 0 : _a.url;
        questType.name = playlist.name;
        questType.isrcs =
            '---\r\n- ' +
                playlist.tracks.items
                    .map((track) => track.track.external_ids.isrc)
                    .join('\r\n- ');
        questType.created_at = new Date();
        questType.updated_at = new Date();
        quest.quest_spotify_playlists = questType;
        quest.kind = 12;
        return quest;
    }
}
exports.QuestSpotifyPlaylistsFactory = QuestSpotifyPlaylistsFactory;
class QuestYoutubesFactory {
    async buildQuest(quest, dto) {
        const questType = new quest_youtubes_entity_1.QuestYoutubes();
        questType.created_at = new Date();
        questType.updated_at = new Date();
        questType.url = dto.quest.quest_youtube_attributes.url;
        const youtubeService = new youtube_service_1.YoutubeService();
        const { title } = await youtubeService.search(questType.url);
        questType.name = title;
        if (dto.quest.quest_youtube_attributes.url.indexOf('/channel') != -1) {
            questType.kind = 0;
            quest.kind = 6;
        }
        else if (dto.quest.quest_youtube_attributes.url.indexOf('/watch') != -1) {
            questType.kind = 1;
            quest.kind = 7;
        }
        else if (dto.quest.quest_youtube_attributes.url.indexOf('/user') != -1) {
            questType.kind = 2;
            quest.kind = 6;
        }
        quest.quest_youtubes = questType;
        return quest;
    }
}
exports.QuestYoutubesFactory = QuestYoutubesFactory;
//# sourceMappingURL=quest.build.service.js.map