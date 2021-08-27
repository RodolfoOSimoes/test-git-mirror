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
const pagination_service_1 = require("../../utils/pagination/pagination.service");
const typeorm_1 = require("typeorm");
const admin_service_1 = require("../admin/admin.service");
const quest_build_service_1 = require("./quest.build.service");
const QuestTypes_1 = require("../../enums/QuestTypes");
const AdminRoles_1 = require("../../enums/AdminRoles");
const quest_opts_entity_1 = require("../../entities/quest-opts.entity");
const quest_pre_saves_entity_1 = require("../../entities/quest-pre-saves.entity");
let QuestService = class QuestService {
    constructor(questRepository, questOptsRepository, questPreSaveRepository, adminService, paginationService) {
        this.questRepository = questRepository;
        this.questOptsRepository = questOptsRepository;
        this.questPreSaveRepository = questPreSaveRepository;
        this.adminService = adminService;
        this.paginationService = paginationService;
    }
    async create(admin_id, dto) {
        const admin = await this.adminService.findById(admin_id);
        const quest = await new quest_build_service_1.QuestBuildService().buildQuest(dto, admin);
        await this.questRepository.save(quest);
        return { message: 'Quest criada com sucesso.' };
    }
    async findAll(page = 1) {
        const limit = 10;
        const countPromise = this.questRepository.count({
            where: { deleted: false },
        });
        const dataPromise = this.questRepository.find({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                id: 'DESC',
            },
            where: { deleted: false },
            relations: [
                'accomplished_quests',
                'quest_spotifies',
                'quest_opts',
                'quest_pre_saves',
                'quest_questions',
                'quest_spotify_playlists',
                'quest_youtubes',
                'admin',
            ],
        });
        const [dataResult, count] = await Promise.all([dataPromise, countPromise]);
        const data = dataResult.map((quest) => this.questMapper(quest));
        return {
            data,
            currentPage: page,
            size: Math.ceil(count / limit),
            links: this.paginationService.pagination('v1/backoffice/quests', page, limit, count),
        };
    }
    async findOne(id) {
        var _a, _b;
        const result = await this.questRepository.findOne(id, {
            relations: [
                'accomplished_quests',
                'quest_spotifies',
                'quest_opts',
                'quest_pre_saves',
                'quest_questions',
                'quest_spotify_playlists',
                'quest_youtubes',
                'admin',
            ],
        });
        return {
            id: result.id,
            accomplished_count: (_a = result.accomplished_quests) === null || _a === void 0 ? void 0 : _a.length,
            created_at: result.created_at,
            date_start: result.date_start,
            kind: QuestTypes_1.QuestMissionType[result.kind],
            score: result.score,
            status: result.status,
            updated_at: result.updated_at,
            admin: {
                id: result.admin.id,
                type: AdminRoles_1.AdminRole[result.admin.roles].toLowerCase(),
            },
            quest_opt: result.quest_opts,
            quest_youtube: Object.assign(Object.assign({}, result.quest_youtubes), { kind: QuestTypes_1.YoutubeKind[(_b = result === null || result === void 0 ? void 0 : result.quest_youtubes) === null || _b === void 0 ? void 0 : _b.kind] }),
            quest_question: result.quest_questions,
            quest_pre_save: result.quest_pre_saves,
            quest_spotify_playlist: result.quest_spotify_playlists,
            quest_spotify: result.quest_spotifies,
        };
    }
    async findListUsers(id, page = 1) {
        const limit = 10;
        const size = await this.questRepository.findOne(id, {
            relations: ['accomplished_quests'],
        });
        const count = size.accomplished_quests.length;
        const [quest] = await this.questRepository.find({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                id: 'DESC',
            },
            where: { id: id },
            relations: ['accomplished_quests', 'accomplished_quests.user'],
        });
        return {
            data: this.userListMapper(quest),
            currentPage: page,
            size: Math.ceil(count / limit),
            links: this.paginationService.pagination('v1/backoffice/quests', page, limit, count),
        };
    }
    async update(admin_id, id, dto) {
        const admin = await this.adminService.findById(admin_id);
        const quest = await this.questRepository.findOne(id, {
            relations: [
                'accomplished_quests',
                'quest_spotifies',
                'quest_opts',
                'quest_pre_saves',
                'quest_questions',
                'quest_spotify_playlists',
                'quest_youtubes',
            ],
        });
        if (quest.quest_opts) {
            await this.questOptsRepository.update(quest.quest_opts.id, {
                description: dto.quest.quest_opt_attributes.description,
                updated_at: new Date(),
            });
        }
        if (quest.quest_opts) {
            await this.questOptsRepository.update(quest.quest_opts.id, {
                description: dto.quest.quest_opt_attributes.description,
                updated_at: new Date(),
            });
        }
        if (quest.quest_pre_saves) {
            await this.questPreSaveRepository.update(quest.quest_pre_saves.id, {
                name_artist: dto.quest.quest_pre_save_attributes.name_artist,
                launch_in: dto.quest.quest_pre_save_attributes.launch_in,
                name_product: dto.quest.quest_pre_save_attributes.name_product,
                updated_at: new Date(),
            });
        }
        await this.questRepository.update(id, {
            admin: admin,
            updated_at: new Date(),
            status: dto.quest.status,
        });
        return { message: 'Quest atualizada com sucesso.' };
    }
    async remove(id) {
        await this.questRepository.update(id, {
            status: false,
        });
        return { message: 'Quest desativada com sucesso.' };
    }
    questMapper(quest) {
        var _a;
        return {
            id: quest.id,
            date_start: quest.date_start,
            kind: QuestTypes_1.QuestMissionType[quest.kind],
            status: quest.status,
            accomplished_count: quest.accomplished_quests.length,
            admin: {
                id: quest.admin.id,
                type: AdminRoles_1.AdminRole[quest.admin.roles].toLowerCase(),
            },
            quest_opt: quest.quest_opts,
            quest_youtube: Object.assign(Object.assign({}, quest.quest_youtubes), { kind: QuestTypes_1.YoutubeKind[(_a = quest === null || quest === void 0 ? void 0 : quest.quest_youtubes) === null || _a === void 0 ? void 0 : _a.kind] }),
            quest_question: quest.quest_questions,
            quest_pre_save: quest.quest_pre_saves,
            quest_spotify_playlist: quest.quest_spotify_playlists,
            quest_spotify: quest.quest_spotifies,
        };
    }
    userListMapper(quest) {
        return quest.accomplished_quests.map((accomplishe_quest) => {
            return {
                id: accomplishe_quest.user.id,
                type: 'users',
                name: accomplishe_quest.user.name,
                email: accomplishe_quest.user.email,
            };
        });
    }
};
QuestService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('QUEST_REPOSITORY')),
    __param(1, common_1.Inject('QUEST_OPTS_REPOSITORY')),
    __param(2, common_1.Inject('QUEST_PRE_SAVES_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        admin_service_1.AdminService,
        pagination_service_1.PaginationService])
], QuestService);
exports.QuestService = QuestService;
//# sourceMappingURL=quest.service.js.map