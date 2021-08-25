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
exports.QuestSpotifyPlaylists = void 0;
const quest_entity_1 = require("./quest.entity");
const typeorm_1 = require("typeorm");
const user_quest_spotify_playlists_entity_1 = require("./user-quest-spotify-playlists.entity");
let QuestSpotifyPlaylists = class QuestSpotifyPlaylists {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], QuestSpotifyPlaylists.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], QuestSpotifyPlaylists.prototype, "uri", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], QuestSpotifyPlaylists.prototype, "tracks_count", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], QuestSpotifyPlaylists.prototype, "points_for_track", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], QuestSpotifyPlaylists.prototype, "isrcs", void 0);
__decorate([
    typeorm_1.OneToOne((type) => quest_entity_1.Quest, (entity) => entity.quest_spotify_playlists),
    typeorm_1.JoinColumn({ name: 'quest_id' }),
    __metadata("design:type", quest_entity_1.Quest)
], QuestSpotifyPlaylists.prototype, "quest", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], QuestSpotifyPlaylists.prototype, "question", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], QuestSpotifyPlaylists.prototype, "points_for_question", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], QuestSpotifyPlaylists.prototype, "answer", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], QuestSpotifyPlaylists.prototype, "question_2", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], QuestSpotifyPlaylists.prototype, "answer_2", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], QuestSpotifyPlaylists.prototype, "points_for_question_2", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], QuestSpotifyPlaylists.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], QuestSpotifyPlaylists.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], QuestSpotifyPlaylists.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], QuestSpotifyPlaylists.prototype, "cover_url", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_quest_spotify_playlists_entity_1.UserQuestSpotifyPlaylist, (entity) => entity.quest_spotify_playlists),
    __metadata("design:type", Array)
], QuestSpotifyPlaylists.prototype, "user_quest_spotify_playlists", void 0);
QuestSpotifyPlaylists = __decorate([
    typeorm_1.Entity('quest_spotify_playlists')
], QuestSpotifyPlaylists);
exports.QuestSpotifyPlaylists = QuestSpotifyPlaylists;
//# sourceMappingURL=quest-spotify-playlists.entity.js.map