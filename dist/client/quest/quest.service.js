"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestService = void 0;
const common_1 = require("@nestjs/common");
const spotify_service_1 = require("../../apis/spotify/spotify.service");
const accomplished_quest_entity_1 = require("../../entities/accomplished-quest.entity");
const campaign_entity_1 = require("../../entities/campaign.entity");
const pre_save_users_entity_1 = require("../../entities/pre-save-users.entity");
const quest_pre_saves_entity_1 = require("../../entities/quest-pre-saves.entity");
const quest_questions_entity_1 = require("../../entities/quest-questions.entity");
const quest_spotifies_entity_1 = require("../../entities/quest-spotifies.entity");
const quest_spotify_playlists_entity_1 = require("../../entities/quest-spotify-playlists.entity");
const quest_entity_1 = require("../../entities/quest.entity");
const statement_entity_1 = require("../../entities/statement.entity");
const user_quest_spotify_playlists_entity_1 = require("../../entities/user-quest-spotify-playlists.entity");
const user_entity_1 = require("../../entities/user.entity");
const QuestTypes_1 = require("../../enums/QuestTypes");
const date_utils_1 = require("../../utils/date.utils");
const pagination_service_1 = require("../../utils/pagination/pagination.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
let QuestService = class QuestService {
    constructor(questsRepository, userRepository, userQuestSpotifyRepository, questSpotifyPlaylistRepository, accomplishedQuestsRepository, questSpotifyRepository, questQuestionRepository, statementRepository, campaignRepository, preSaveUserRepository, preSaveRepository, paginationService) {
        this.questsRepository = questsRepository;
        this.userRepository = userRepository;
        this.userQuestSpotifyRepository = userQuestSpotifyRepository;
        this.questSpotifyPlaylistRepository = questSpotifyPlaylistRepository;
        this.accomplishedQuestsRepository = accomplishedQuestsRepository;
        this.questSpotifyRepository = questSpotifyRepository;
        this.questQuestionRepository = questQuestionRepository;
        this.statementRepository = statementRepository;
        this.campaignRepository = campaignRepository;
        this.preSaveUserRepository = preSaveUserRepository;
        this.preSaveRepository = preSaveRepository;
        this.paginationService = paginationService;
    }
    async findAll(user_id) {
        const resultPromise = this.questsRepository.find({
            where: { date_start: typeorm_2.LessThan(new Date()), status: true, deleted: false },
            order: { date_start: 'DESC' },
            relations: [
                'quest_spotifies',
                'quest_opts',
                'quest_pre_saves',
                'quest_questions',
                'quest_spotify_playlists',
                'quest_youtubes',
            ],
        });
        const userPromise = this.userRepository.findOne(user_id, {
            relations: [
                'accomplished_quests',
                'accomplished_quests.quest',
                'accomplished_quests.quest.quest_spotify_playlists',
            ],
        });
        const [result, user] = await Promise.all([resultPromise, userPromise]);
        const userQuestSpotify = await this.userQuestSpotifyRepository.find({
            where: { user: user },
            relations: ['quest_spotify_playlists'],
        });
        const data = this.formatQuest(result, user.accomplished_quests, userQuestSpotify);
        return {
            data,
            size: Math.ceil(result.length / 100),
            links: this.paginationService.pagination('v1/app/quests', 0, 100, result.length),
        };
    }
    async update(user_id, quest_id, body) {
        var _a, _b, _c;
        const userPromise = this.userRepository.findOne(user_id);
        const questPromise = this.questsRepository.findOne(quest_id, {
            relations: ['quest_spotify_playlists'],
        });
        const campaignPromise = this.campaignRepository.findOne({
            status: true,
            date_start: typeorm_1.LessThanOrEqual(date_utils_1.formatDate(new Date())),
            date_finish: typeorm_1.MoreThanOrEqual(date_utils_1.formatDate(new Date())),
        });
        const [user, quest, campaign] = await Promise.all([
            userPromise,
            questPromise,
            campaignPromise,
        ]);
        const kind = QuestTypes_1.QuestMissionType[quest === null || quest === void 0 ? void 0 : quest.kind];
        const spotifyService = new spotify_service_1.SpotifyService();
        if (kind == 'spotify_follow_playlist') {
            quest.quest_spotifies = await this.questSpotifyRepository.findOne({
                where: { quest: quest },
            });
            const followPlaylistPromise = spotifyService.followPlaylist(user.credentials['refresh_token'], quest.quest_spotifies.uid);
            const accomplishedPromise = this.accomplishedQuestsRepository.save({
                quest: quest,
                user: user,
                created_at: new Date(),
                updated_at: new Date(),
            });
            const statementPromise = this.statementRepository.save({
                user: user,
                campaign: campaign,
                amount: quest.score,
                kind: 1,
                statementable_type: 'Quest',
                balance: 0,
                statementable_id: quest.id,
                expiration_date: new Date(new Date().setDate(new Date().getDate() + 90)),
                created_at: new Date(),
                updated_at: new Date(),
            });
            await Promise.all([
                statementPromise,
                accomplishedPromise,
                followPlaylistPromise,
            ]);
        }
        if (kind == 'spotify_follow_artist') {
            quest.quest_spotifies = await this.questSpotifyRepository.findOne({
                where: { quest: quest },
            });
            const followArtist = spotifyService.followArtist(user.credentials['refresh_token'], quest.quest_spotifies.uid);
            const accomplishedPromise = this.accomplishedQuestsRepository.save({
                quest: quest,
                user: user,
                created_at: new Date(),
                updated_at: new Date(),
            });
            const statementPromise = this.statementRepository.save({
                user: user,
                campaign: campaign,
                amount: quest.score,
                kind: 1,
                statementable_type: 'Quest',
                balance: 0,
                statementable_id: quest.id,
                expiration_date: new Date(new Date().setDate(new Date().getDate() + 90)),
                created_at: new Date(),
                updated_at: new Date(),
            });
            await Promise.all([statementPromise, accomplishedPromise, followArtist]);
        }
        if (kind == 'spotify_save_album') {
            quest.quest_spotifies = await this.questSpotifyRepository.findOne({
                where: { quest: quest },
            });
            const followAlbum = await spotifyService.followAlbum(user.credentials['refresh_token'], quest.quest_spotifies.uid);
            const accomplishedPromise = this.accomplishedQuestsRepository.save({
                quest: quest,
                user: user,
                created_at: new Date(),
                updated_at: new Date(),
            });
            const statementPromise = this.statementRepository.save({
                user: user,
                campaign: campaign,
                amount: quest.score,
                kind: 1,
                statementable_type: 'Quest',
                balance: 0,
                statementable_id: quest.id,
                expiration_date: new Date(new Date().setDate(new Date().getDate() + 90)),
                created_at: new Date(),
                updated_at: new Date(),
            });
            await Promise.all([statementPromise, accomplishedPromise, followAlbum]);
        }
        if (kind == 'spotify_save_track') {
            quest.quest_spotifies = await this.questSpotifyRepository.findOne({
                where: { quest: quest },
            });
            const saveTrack = await spotifyService.saveTrack(user.credentials['refresh_token'], quest.quest_spotifies.uid);
            const accomplishedPromise = this.accomplishedQuestsRepository.save({
                quest: quest,
                user: user,
                created_at: new Date(),
                updated_at: new Date(),
            });
            const statementPromise = this.statementRepository.save({
                user: user,
                campaign: campaign,
                amount: quest.score,
                kind: 1,
                statementable_type: 'Quest',
                balance: 0,
                statementable_id: quest.id,
                expiration_date: new Date(new Date().setDate(new Date().getDate() + 90)),
                created_at: new Date(),
                updated_at: new Date(),
            });
            await Promise.all([statementPromise, accomplishedPromise, saveTrack]);
        }
        if (kind == 'question') {
            quest.quest_questions = await this.questQuestionRepository.findOne({
                where: { quest: quest },
            });
            const awnser = quest.quest_questions.answer;
            if (!body['answer'])
                return {
                    hasError: true,
                    answer: ['Você precisa inserir uma resposta'],
                };
            if (body['answer'] != awnser)
                return {
                    hasError: true,
                    message: 'Responsta incorreta',
                };
            const accomplishedPromise = this.accomplishedQuestsRepository.save({
                quest: quest,
                user: user,
                created_at: new Date(),
                updated_at: new Date(),
            });
            const statementPromise = this.statementRepository.save({
                user: user,
                campaign: campaign,
                amount: quest.score,
                kind: 1,
                statementable_type: 'Quest',
                balance: 0,
                statementable_id: quest.id,
                expiration_date: new Date(new Date().setDate(new Date().getDate() + 90)),
                created_at: new Date(),
                updated_at: new Date(),
            });
            await Promise.all([statementPromise, accomplishedPromise]);
        }
        if (kind == 'youtube_watch_video') {
            const accomplishedPromise = this.accomplishedQuestsRepository.save({
                quest: quest,
                user: user,
                created_at: new Date(),
                updated_at: new Date(),
            });
            const statementPromise = this.statementRepository.save({
                user: user,
                campaign: campaign,
                amount: quest.score,
                kind: 1,
                statementable_type: 'Quest',
                balance: 0,
                statementable_id: quest.id,
                expiration_date: new Date(new Date().setDate(new Date().getDate() + 90)),
                created_at: new Date(),
                updated_at: new Date(),
            });
            await Promise.all([statementPromise, accomplishedPromise]);
        }
        if (kind == 'pre_save') {
            quest.quest_pre_saves = await this.preSaveRepository.findOne({
                where: { quest: quest },
            });
            const preSavePromisse = this.preSaveUserRepository.save({
                created_at: new Date(),
                updated_at: new Date(),
                saved: false,
                quest_pre_save: quest.quest_pre_saves,
                user: user,
            });
            const accomplishedPromise = this.accomplishedQuestsRepository.save({
                quest: quest,
                user: user,
                created_at: new Date(),
                updated_at: new Date(),
            });
            const statementPromise = this.statementRepository.save({
                user: user,
                campaign: campaign,
                amount: quest.score,
                kind: 1,
                statementable_type: 'Quest',
                balance: 0,
                statementable_id: quest.id,
                expiration_date: new Date(new Date().setDate(new Date().getDate() + 90)),
                created_at: new Date(),
                updated_at: new Date(),
            });
            await Promise.all([
                statementPromise,
                accomplishedPromise,
                preSavePromisse,
            ]);
        }
        if (kind == 'opt') {
            const email = (_a = body === null || body === void 0 ? void 0 : body['quest']) === null || _a === void 0 ? void 0 : _a['email'];
            if (!email || (email && !this.validateEmail(email))) {
                return {
                    hasError: true,
                    message: {
                        email: ['E-mail inválido'],
                    },
                };
            }
            const userPromisse = this.userRepository.update(user_id, {
                email: email.toLowerCase(),
                updated_at: new Date(),
            });
            const accomplishedPromise = this.accomplishedQuestsRepository.save({
                quest: quest,
                user: user,
                created_at: new Date(),
                updated_at: new Date(),
            });
            const statementPromise = this.statementRepository.save({
                user: user,
                campaign: campaign,
                amount: quest.score,
                kind: 1,
                statementable_type: 'Quest',
                balance: 0,
                statementable_id: quest.id,
                expiration_date: new Date(new Date().setDate(new Date().getDate() + 90)),
                created_at: new Date(),
                updated_at: new Date(),
            });
            await Promise.all([statementPromise, accomplishedPromise, userPromisse]);
        }
        if (kind == 'quest_spotify_playlist') {
            const questAnswer = (_b = body === null || body === void 0 ? void 0 : body['quest']) === null || _b === void 0 ? void 0 : _b['answer'];
            quest.quest_spotify_playlists =
                await this.questSpotifyPlaylistRepository.findOne({
                    where: { quest: quest },
                });
            if (!questAnswer)
                return {
                    hasError: true,
                    answer: ['Você precisa inserir uma resposta'],
                };
            const userQuestSpotify = await this.userQuestSpotifyRepository.findOne({
                where: {
                    user: user,
                    quest_spotify_playlists: quest.quest_spotify_playlists,
                },
                relations: ['quest_spotify_playlists'],
            });
            if (!userQuestSpotify) {
                return {
                    hasError: true,
                    message: 'Você precisa aguardar o processamento das músicas.',
                };
            }
            if ((!userQuestSpotify.question_answered &&
                userQuestSpotify.quest_spotify_playlists.answer != questAnswer) ||
                (userQuestSpotify.question_answered &&
                    ((_c = userQuestSpotify.quest_spotify_playlists) === null || _c === void 0 ? void 0 : _c.answer_2) != questAnswer)) {
                return {
                    hasError: true,
                    message: 'Resposta incorreta.',
                };
            }
            if (!userQuestSpotify.question_answered) {
                await this.userQuestSpotifyRepository.update(userQuestSpotify.id, {
                    question_answered: true,
                    updated_at: new Date(),
                });
                if (!userQuestSpotify.quest_spotify_playlists.question_2) {
                    const accomplishedPromise = this.accomplishedQuestsRepository.save({
                        quest: quest,
                        user: user,
                        created_at: new Date(),
                        updated_at: new Date(),
                    });
                    const statementPromise = this.statementRepository.save({
                        user: user,
                        campaign: campaign,
                        amount: quest.score,
                        kind: 1,
                        statementable_type: 'Quest',
                        balance: 0,
                        statementable_id: quest.id,
                        expiration_date: new Date(new Date().setDate(new Date().getDate() + 90)),
                        created_at: new Date(),
                        updated_at: new Date(),
                    });
                    await Promise.all([statementPromise, accomplishedPromise]);
                }
            }
            if (userQuestSpotify.question_answered &&
                userQuestSpotify.quest_spotify_playlists.question_2) {
                const accomplishedPromise = this.accomplishedQuestsRepository.save({
                    quest: quest,
                    user: user,
                    created_at: new Date(),
                    updated_at: new Date(),
                });
                const statementPromise = this.statementRepository.save({
                    user: user,
                    campaign: campaign,
                    amount: quest.score,
                    kind: 1,
                    statementable_type: 'Quest',
                    balance: 0,
                    statementable_id: quest.id,
                    expiration_date: new Date(new Date().setDate(new Date().getDate() + 90)),
                    created_at: new Date(),
                    updated_at: new Date(),
                });
                await Promise.all([statementPromise, accomplishedPromise]);
            }
        }
        return { hasError: false, message: 'ok' };
    }
    validateEmail(email) {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return re.test(email.toLowerCase());
    }
    formatQuest(quests, accomplished_quests, userQuestSpotify) {
        return quests.map((quest) => {
            return {
                id: quest.id,
                type: 'quests',
                kind: QuestTypes_1.QuestMissionType[quest.kind],
                status: quest.status,
                date_start: quest.date_start,
                score: quest.score,
                completed: (accomplished_quests === null || accomplished_quests === void 0 ? void 0 : accomplished_quests.find((accomplished) => accomplished.quest.id === quest.id))
                    ? true
                    : false,
                extra: this.getExtra(quest, userQuestSpotify),
            };
        });
    }
    getExtra(quest, userQuestSpotify) {
        switch (quest.kind) {
            case 0:
                return {
                    kind: 'Spotify',
                    id: quest.quest_spotifies.id,
                    kind_spotify: 'artist',
                    to_listen: false,
                    uid: quest.quest_spotifies.uid,
                    uri: quest.quest_spotifies.uri,
                    name: quest.quest_spotifies.name,
                };
            case 1:
                return {
                    kind: 'Spotify',
                    id: quest.quest_spotifies.id,
                    kind_spotify: 'playlist',
                    to_listen: false,
                    uid: quest.quest_spotifies.uid,
                    uri: quest.quest_spotifies.uri,
                    name: quest.quest_spotifies.name,
                };
            case 2:
                return {
                    kind: 'Spotify',
                    id: quest.quest_spotifies.id,
                    kind_spotify: 'track',
                    to_listen: false,
                    uid: quest.quest_spotifies.uid,
                    uri: quest.quest_spotifies.uri,
                    name: quest.quest_spotifies.name,
                };
            case 3:
                return {
                    kind: 'Spotify',
                    id: quest.quest_spotifies.id,
                    kind_spotify: 'album',
                    to_listen: false,
                    uid: quest.quest_spotifies.uid,
                    uri: quest.quest_spotifies.uri,
                    name: quest.quest_spotifies.name,
                };
            case 4:
                return {
                    kind: 'Spotify',
                    id: quest.quest_spotifies.id,
                    kind_spotify: 'track',
                    to_listen: true,
                    uid: quest.quest_spotifies.uid,
                    uri: quest.quest_spotifies.uri,
                    name: quest.quest_spotifies.name,
                };
            case 5:
                return {
                    kind: 'Question',
                    id: quest.quest_questions.id,
                    question: quest.quest_questions.question,
                };
            case 6:
                return {
                    kind: 'Youtube',
                    id: quest.quest_youtubes.id,
                    kind_youtube: 'user',
                    name: quest.quest_youtubes.name,
                    url: quest.quest_youtubes.url,
                    item_id: this.getYoutubeUserName(quest.quest_youtubes.url),
                };
            case 7:
                return {
                    kind: 'Youtube',
                    id: quest.quest_youtubes.id,
                    kind_youtube: 'watch',
                    name: quest.quest_youtubes.name,
                    url: quest.quest_youtubes.url,
                    item_id: this.getYoutubeId(quest.quest_youtubes.url),
                };
            case 10:
                return {
                    kind: 'PreSave',
                    id: quest.quest_pre_saves.id,
                    launch_in: quest.quest_pre_saves.launch_in,
                    name_artist: quest.quest_pre_saves.name_artist,
                    name_product: quest.quest_pre_saves.name_product,
                    uri: quest.quest_pre_saves.uri,
                };
            case 11:
                return {
                    kind: 'Opt',
                    id: quest.quest_opts.id,
                    description: quest.quest_opts.description,
                };
            case 12:
                const userQuest = userQuestSpotify.find((userQuest) => userQuest.quest_spotify_playlists.id ==
                    quest.quest_spotify_playlists.id);
                return {
                    kind: 'SpotifyPlaylist',
                    id: quest.quest_spotify_playlists.id,
                    completed: userQuest ? true : false,
                    cover_url: quest.quest_spotify_playlists.cover_url,
                    name: quest.quest_spotify_playlists.name,
                    points_for_question: quest.quest_spotify_playlists.points_for_question,
                    points_for_question_2: quest.quest_spotify_playlists.points_for_question_2,
                    points_for_track: quest.quest_spotify_playlists.points_for_track,
                    question: quest.quest_spotify_playlists.question,
                    question_2: quest.quest_spotify_playlists.question_2,
                    songs_heard: (userQuest === null || userQuest === void 0 ? void 0 : userQuest.isrcs.split(' ').length) - 1 || 0,
                    tracks_count: quest.quest_spotify_playlists.tracks_count,
                    uri: quest.quest_spotify_playlists.uri,
                };
            default:
                return undefined;
        }
    }
    getYoutubeId(url) {
        let video_id = url.split('v=')[1];
        const ampersandPosition = video_id.indexOf('&');
        if (ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        return video_id;
    }
    getYoutubeUserName(url) {
        let user_id = url.split('user/')[1] || url.split('channel/')[1];
        const ampersandPosition = user_id === null || user_id === void 0 ? void 0 : user_id.indexOf('?');
        if (ampersandPosition != -1) {
            user_id = user_id.substring(0, ampersandPosition);
        }
        return user_id;
    }
};
QuestService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('QUEST_REPOSITORY')),
    __param(1, common_1.Inject('USER_REPOSITORY')),
    __param(2, common_1.Inject('USER_QUEST_SPOTIFY_PLAYLISTS_REPOSITORY')),
    __param(3, common_1.Inject('QUEST_SPOTIFY_PLAYLISTS_REPOSITORY')),
    __param(4, common_1.Inject('ACCOMPLISHED_QUEST_REPOSITORY')),
    __param(5, common_1.Inject('QUEST_SPOTIFIES_REPOSITORY')),
    __param(6, common_1.Inject('QUEST_QUESTIONS_REPOSITORY')),
    __param(7, common_1.Inject('STATEMENT_REPOSITORY')),
    __param(8, common_1.Inject('CAMPAIGN_REPOSITORY')),
    __param(9, common_1.Inject('PRE_SAVE_USER_REPOSITORY')),
    __param(10, common_1.Inject('QUEST_PRE_SAVES_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        pagination_service_1.PaginationService])
], QuestService);
exports.QuestService = QuestService;
//# sourceMappingURL=quest.service.js.map