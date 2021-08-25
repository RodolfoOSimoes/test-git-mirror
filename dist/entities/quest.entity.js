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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quest = void 0;
const admin_entity_1 = require("./admin.entity");
const typeorm_1 = require("typeorm");
const quest_spotifies_entity_1 = require("./quest-spotifies.entity");
const typeorm_2 = require("typeorm");
const quest_opts_entity_1 = require("./quest-opts.entity");
const quest_pre_saves_entity_1 = require("./quest-pre-saves.entity");
const quest_questions_entity_1 = require("./quest-questions.entity");
const quest_spotify_playlists_entity_1 = require("./quest-spotify-playlists.entity");
const quest_youtubes_entity_1 = require("./quest-youtubes.entity");
const accomplished_quest_entity_1 = require("./accomplished-quest.entity");
let Quest = class Quest {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Quest.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Quest.prototype, "date_start", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Quest.prototype, "kind", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => admin_entity_1.Admin),
    typeorm_1.JoinColumn({ name: 'admin_id' }),
    __metadata("design:type", admin_entity_1.Admin)
], Quest.prototype, "admin", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Quest.prototype, "score", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: true, default: true }),
    __metadata("design:type", Boolean)
], Quest.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Quest.prototype, "deleted", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Quest.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Quest.prototype, "updated_at", void 0);
__decorate([
    typeorm_2.OneToOne((type) => quest_spotifies_entity_1.QuestSpotifies, (entity) => entity.quest, {
        cascade: true,
    }),
    __metadata("design:type", quest_spotifies_entity_1.QuestSpotifies)
], Quest.prototype, "quest_spotifies", void 0);
__decorate([
    typeorm_2.OneToOne((type) => quest_opts_entity_1.QuestOpts, (entity) => entity.quest, {
        cascade: true,
    }),
    __metadata("design:type", quest_opts_entity_1.QuestOpts)
], Quest.prototype, "quest_opts", void 0);
__decorate([
    typeorm_2.OneToOne((type) => quest_pre_saves_entity_1.QuestPreSaves, (entity) => entity.quest, {
        cascade: true,
    }),
    __metadata("design:type", quest_pre_saves_entity_1.QuestPreSaves)
], Quest.prototype, "quest_pre_saves", void 0);
__decorate([
    typeorm_2.OneToOne((type) => quest_questions_entity_1.QuestQuestions, (entity) => entity.quest, {
        cascade: true,
    }),
    __metadata("design:type", quest_questions_entity_1.QuestQuestions)
], Quest.prototype, "quest_questions", void 0);
__decorate([
    typeorm_2.OneToOne((type) => quest_spotify_playlists_entity_1.QuestSpotifyPlaylists, (entity) => entity.quest, {
        cascade: true,
    }),
    __metadata("design:type", quest_spotify_playlists_entity_1.QuestSpotifyPlaylists)
], Quest.prototype, "quest_spotify_playlists", void 0);
__decorate([
    typeorm_2.OneToOne((type) => quest_youtubes_entity_1.QuestYoutubes, (entity) => entity.quest, {
        cascade: true,
    }),
    __metadata("design:type", quest_youtubes_entity_1.QuestYoutubes)
], Quest.prototype, "quest_youtubes", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Quest.prototype, "accomplished_count", void 0);
__decorate([
    typeorm_1.OneToMany((type) => accomplished_quest_entity_1.AccomplishedQuests, (entity) => entity.quest),
    __metadata("design:type", Array)
], Quest.prototype, "accomplished_quests", void 0);
Quest = __decorate([
    typeorm_1.Entity('quests')
], Quest);
exports.Quest = Quest;
//# sourceMappingURL=quest.entity.js.map