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
exports.RecentlyPlayedJob = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const spotify_service_1 = require("../apis/spotify/spotify.service");
const user_entity_1 = require("../entities/user.entity");
const typeorm_1 = require("typeorm");
const date_utils_1 = require("../utils/date.utils");
const campaign_entity_1 = require("../entities/campaign.entity");
const rescue_entity_1 = require("../entities/rescue.entity");
const recently_playeds_entity_1 = require("../entities/recently-playeds.entity");
const cash_backs_entity_1 = require("../entities/cash-backs.entity");
const statement_entity_1 = require("../entities/statement.entity");
const quest_entity_1 = require("../entities/quest.entity");
const quest_spotify_playlists_entity_1 = require("../entities/quest-spotify-playlists.entity");
const user_quest_spotify_playlists_entity_1 = require("../entities/user-quest-spotify-playlists.entity");
const bull_1 = require("@nestjs/bull");
let RecentlyPlayedJob = class RecentlyPlayedJob {
    constructor(userRepository, campaignRepository, rescueRepository, recentlyRepository, cashBackRepository, statementRepository, questRepository, userQuestSpotifyRepository, spotifyService, recentlyQueue) {
        this.userRepository = userRepository;
        this.campaignRepository = campaignRepository;
        this.rescueRepository = rescueRepository;
        this.recentlyRepository = recentlyRepository;
        this.cashBackRepository = cashBackRepository;
        this.statementRepository = statementRepository;
        this.questRepository = questRepository;
        this.userQuestSpotifyRepository = userQuestSpotifyRepository;
        this.spotifyService = spotifyService;
        this.recentlyQueue = recentlyQueue;
    }
    async handleCron() {
        console.time('recently_played');
        const listUsers = await this.loadUsers();
        while (listUsers.length > 0) {
            const users = listUsers.splice(0, 10);
            await this.recentlyQueue.add(users, { attempts: 3 });
        }
        console.timeEnd('recently_played');
    }
    async runJob(users) {
        users.forEach(async (user) => {
            try {
                const loadLastTimeVerify = await this.loadLastTimeVerify(user);
                const credentials = user.credentials;
                const recentlyPlayeds = await this.spotifyService.getRecentlyPlayed(credentials['refresh_token'], loadLastTimeVerify);
                const recently = this.prepareRecentlyPlayed(recentlyPlayeds);
                if (recently) {
                    const [questPlaylistSpotify, campaign, rescues] = await Promise.all([
                        this.loadSpotifyPlaylistQuests(),
                        this.loadCampaign(),
                        this.loadRescues(),
                    ]);
                    await this.saveCashBacks(user, rescues, recentlyPlayeds, campaign, questPlaylistSpotify);
                    await this.updateUser(user, recently);
                    await this.saveRecentlyPlaylist(user, recently);
                }
            }
            catch (error) {
                console.log(`${user.id} - ${error.message}`);
            }
        });
    }
    async loadUsers() {
        return await this.userRepository.find({
            where: {
                deleted: false,
                situation: false,
                last_time_verified: typeorm_1.LessThan(new Date().getTime()),
                id: typeorm_1.In([607]),
            },
            select: ['id', 'credentials', 'last_heard'],
        });
    }
    async loadLastTimeVerify(user) {
        const recently = await this.recentlyRepository.findOne({
            where: { user: user },
            select: ['content'],
            order: { created_at: 'DESC' },
        });
        try {
            return recently.content['cursors']['after'];
        }
        catch (error) {
            return '0';
        }
    }
    async loadCampaign() {
        return await this.campaignRepository.findOne({
            where: {
                status: true,
                date_start: typeorm_1.LessThanOrEqual(date_utils_1.formatDate(new Date())),
                date_finish: typeorm_1.MoreThanOrEqual(date_utils_1.formatDate(new Date())),
            },
            select: ['id'],
        });
    }
    async loadRescues() {
        return await this.rescueRepository.find({
            order: { id: 'DESC' },
            where: { deleted: false, status: true },
        });
    }
    async updateUser(user, recently) {
        await this.userRepository.update(user.id, {
            last_time_verified: new Date().getTime(),
            last_heard: this.getLastHeardTime(recently),
        });
    }
    getLastHeardTime(recently) {
        var _a, _b;
        return new Date((_b = recently === null || recently === void 0 ? void 0 : recently.items[((_a = recently === null || recently === void 0 ? void 0 : recently.items) === null || _a === void 0 ? void 0 : _a.length) - 1]) === null || _b === void 0 ? void 0 : _b.played_at);
    }
    sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }
    prepareRecentlyPlayed(recently) {
        var _a;
        if (!((_a = recently === null || recently === void 0 ? void 0 : recently.items) === null || _a === void 0 ? void 0 : _a.length))
            return undefined;
        return {
            cursors: recently.cursors,
            next: recently.next,
            items: recently.items.map((item) => {
                return {
                    context: item.context,
                    played_at: item.played_at,
                    track: {
                        href: item.track.href,
                        url: item.track.url,
                        duration_ms: item.track.duration_ms,
                        name: item.track.name,
                    },
                };
            }),
        };
    }
    getLimits(cashbacks, rescues) {
        const uniqueCashbacks = [];
        cashbacks.forEach((cashback) => {
            const cb = uniqueCashbacks.find((cb) => cb.track_id === cashback.track_id);
            if (!cb) {
                uniqueCashbacks.push({
                    track_id: cashback.track_id,
                    count: 1,
                });
            }
            else {
                cb.count++;
            }
        });
        const allowedCashbackLimit = [];
        rescues.forEach((rescue) => {
            const cb = uniqueCashbacks.find((cb) => cb.track_id === rescue.uid);
            if (cb && rescue.limited) {
                allowedCashbackLimit.push({
                    track_id: rescue.uid,
                    limit: rescue.limit_streams - cb.count,
                });
            }
            else if (!cb && rescue.limited) {
                allowedCashbackLimit.push({
                    track_id: rescue.uid,
                    limit: rescue.limit_streams,
                });
            }
        });
        return allowedCashbackLimit;
    }
    getYesterday() {
        const date = new Date();
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
    async saveRecentlyPlaylist(user, recently) {
        var _a;
        await this.recentlyRepository.save({
            user: user,
            content: recently,
            listen_times: ((_a = recently === null || recently === void 0 ? void 0 : recently.items) === null || _a === void 0 ? void 0 : _a.length) || 0,
            checked_in: new Date(),
            created_at: new Date(),
            updated_at: new Date(),
        });
    }
    async loadSpotifyPlaylistQuests() {
        const quests = await this.questRepository.find({
            where: {
                date_start: typeorm_1.LessThan(new Date()),
                status: true,
                deleted: false,
                kind: 12,
            },
            order: { date_start: 'DESC' },
            relations: ['quest_spotify_playlists'],
        });
        const questSpotifyPlaylist = [];
        quests.forEach((quest) => questSpotifyPlaylist.push(quest.quest_spotify_playlists));
        return questSpotifyPlaylist;
    }
    async loadUserQuestSpotifyPlaylists(user, questSpotifyPlaylist) {
        const userQuest = await this.userQuestSpotifyRepository.find({
            where: {
                quest_spotify_playlists: typeorm_1.In(questSpotifyPlaylist.map((qsp) => qsp.id)),
                user,
            },
            relations: ['quest_spotify_playlists'],
        });
        return userQuest;
    }
    async saveCashBacks(user, rescues, recently, campaign, questSpotifyPlaylist) {
        const todayCashBacks = await this.cashBackRepository.find({
            where: { user: user, played_at: typeorm_1.MoreThan(this.getYesterday()) },
            order: { track_id: 'DESC' },
        });
        const cashbacksLimit = this.getLimits(todayCashBacks, rescues);
        const userQuestSpotify = await this.loadUserQuestSpotifyPlaylists(user, questSpotifyPlaylist);
        const userQuestPlaylist = [];
        const statementCashbacks = [];
        recently.items.forEach((item) => {
            const isrc = item['track']['external_ids']['isrc'];
            const rescue = rescues.find((rescue) => rescue.isrc == isrc);
            const todayCashback = cashbacksLimit.find((cb) => cb.track_id == item['track']['id']);
            questSpotifyPlaylist.forEach((qsp) => {
                if (qsp.isrcs.includes(isrc)) {
                    const userQuest = userQuestSpotify.find((uqs) => uqs.quest_spotify_playlists.id == qsp.id);
                    const filteredUserQuest = userQuestPlaylist.find((uqp) => uqp.playlist_id == qsp.id);
                    if (!userQuest && !filteredUserQuest) {
                        userQuestPlaylist.push({
                            isrcs: `---\r\n- ${isrc}`,
                            playlist_id: qsp.id,
                            playlist: qsp,
                            id: null,
                            user: user,
                        });
                    }
                    else if (filteredUserQuest &&
                        !filteredUserQuest.isrcs.includes(isrc)) {
                        filteredUserQuest.isrcs = `${filteredUserQuest.isrcs}\r\n- ${isrc}`;
                    }
                    else if (userQuest) {
                        userQuestPlaylist.push({
                            isrcs: !userQuest.isrcs.includes(isrc)
                                ? `${userQuest.isrcs}\r\n- ${isrc}`
                                : userQuest.isrcs,
                            playlist_id: qsp.id,
                            playlist: qsp,
                            id: userQuest.id,
                            user: user,
                        });
                    }
                }
            });
            if (rescue && todayCashback && todayCashback.limit > 0) {
                todayCashback.limit--;
                statementCashbacks.push({
                    user_id: user.id,
                    rescue_id: rescue,
                    track_id: item['track']['id'],
                    played_at: item['played_at'],
                    name: item['track']['name'],
                    score: rescue.score,
                });
            }
        });
        const userQuestSpotifySave = [];
        const userQuestSpotifyUpdate = [];
        userQuestPlaylist.forEach((uqp) => {
            const userQuestSpotify = new user_quest_spotify_playlists_entity_1.UserQuestSpotifyPlaylist();
            userQuestSpotify.updated_at = new Date();
            userQuestSpotify.isrcs = uqp.isrcs;
            if (uqp.id) {
                userQuestSpotify.id = uqp.id;
                userQuestSpotifyUpdate.push(userQuestSpotify);
            }
            else {
                userQuestSpotify.user = user;
                userQuestSpotify.quest_spotify_playlists = uqp.playlist;
                userQuestSpotify.created_at = new Date();
                userQuestSpotifySave.push(userQuestSpotify);
            }
        });
        const statements = [];
        const cashbacks = [];
        statementCashbacks.forEach((cashback) => {
            cashbacks.push(this.buildCashBack(cashback, user));
            statements.push(this.buildStatement(cashback, user, campaign));
        });
        try {
            await Promise.all([
                this.statementRepository.save(statements),
                this.cashBackRepository.save(cashbacks),
                this.userQuestSpotifyRepository.save(userQuestSpotifySave),
            ]);
            userQuestSpotifyUpdate.forEach(async (uqs) => await this.userQuestSpotifyRepository.update(uqs.id, uqs));
        }
        catch (error) {
            console.log(error.message);
        }
    }
    buildCashBack(cb, user) {
        const cashback = new cash_backs_entity_1.CashBack();
        cashback.user = user;
        cashback.track_id = cb.track_id;
        cashback.played_at = cb.played_at;
        cashback.name = cb.name;
        cashback.rescue = cb.rescue_id;
        cashback.deleted = false;
        cashback.created_at = new Date();
        cashback.updated_at = new Date();
        return cashback;
    }
    buildStatement(cb, user, campaign) {
        const statement = new statement_entity_1.Statement();
        statement.user = user;
        statement.campaign = campaign;
        statement.amount = cb.score;
        statement.kind = 1;
        statement.statementable_type = 'CashBack';
        statement.balance = 0;
        statement.statementable_id = cb.rescue_id.id;
        statement.expiration_date = new Date(new Date().setDate(new Date().getDate() + 90));
        statement.created_at = new Date();
        statement.updated_at = new Date();
        return statement;
    }
};
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_30_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecentlyPlayedJob.prototype, "handleCron", null);
RecentlyPlayedJob = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('USER_REPOSITORY')),
    __param(1, common_1.Inject('CAMPAIGN_REPOSITORY')),
    __param(2, common_1.Inject('RESCUE_REPOSITORY')),
    __param(3, common_1.Inject('RECENTLY_PLAYEDS_REPOSITORY')),
    __param(4, common_1.Inject('CASH_BACK_REPOSITORY')),
    __param(5, common_1.Inject('STATEMENT_REPOSITORY')),
    __param(6, common_1.Inject('QUEST_REPOSITORY')),
    __param(7, common_1.Inject('USER_QUEST_SPOTIFY_PLAYLISTS_REPOSITORY')),
    __param(9, bull_1.InjectQueue('recently_playeds_queue')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        spotify_service_1.SpotifyService, Object])
], RecentlyPlayedJob);
exports.RecentlyPlayedJob = RecentlyPlayedJob;
//# sourceMappingURL=RecentlyPlayedJob.js.map