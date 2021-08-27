"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestModule = void 0;
const common_1 = require("@nestjs/common");
const quest_service_1 = require("./quest.service");
const quest_controller_1 = require("./quest.controller");
const database_module_1 = require("../../database/database.module");
const quest_providers_1 = require("../../providers/quest.providers");
const pagination_service_1 = require("../../utils/pagination/pagination.service");
const user_providers_1 = require("../../providers/user.providers");
const user_quest_spotify_playlists_providers_1 = require("../../providers/user-quest-spotify-playlists.providers");
const accomplished_quest_providers_1 = require("../../providers/accomplished-quest.providers");
const statement_providers_1 = require("../../providers/statement.providers");
const campaign_providers_1 = require("../../providers/campaign.providers");
const pre_save_user_providers_1 = require("../../providers/pre-save-user.providers");
const quest_spotifies_providers_1 = require("../../providers/quest-spotifies.providers");
const quest_spotify_playlists_providers_1 = require("../../providers/quest-spotify-playlists.providers");
const quest_questions_providers_1 = require("../../providers/quest-questions.providers");
const quest_pre_saves_providers_1 = require("../../providers/quest-pre-saves.providers ");
let QuestModule = class QuestModule {
};
QuestModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule],
        controllers: [quest_controller_1.QuestController],
        providers: [
            ...quest_providers_1.questProviders,
            ...user_providers_1.userProviders,
            ...user_quest_spotify_playlists_providers_1.userQuestSpotifyPlaylistsProviders,
            ...quest_spotify_playlists_providers_1.questSpotifyPlaylistsProviders,
            ...accomplished_quest_providers_1.accomplishedQuestProviders,
            ...quest_spotifies_providers_1.questSpotifiesProviders,
            ...quest_questions_providers_1.questQuestionsProviders,
            ...statement_providers_1.statementProviders,
            ...campaign_providers_1.campaignProviders,
            ...pre_save_user_providers_1.preSaveUsersProviders,
            ...quest_pre_saves_providers_1.questPreSavesProviders,
            quest_service_1.QuestService,
            pagination_service_1.PaginationService,
        ],
    })
], QuestModule);
exports.QuestModule = QuestModule;
//# sourceMappingURL=quest.module.js.map