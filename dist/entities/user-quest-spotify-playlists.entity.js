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
exports.UserQuestSpotifyPlaylist = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const quest_spotify_playlists_entity_1 = require("./quest-spotify-playlists.entity");
let UserQuestSpotifyPlaylist = class UserQuestSpotifyPlaylist {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserQuestSpotifyPlaylist.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.User, (entity) => entity.user_quest_spotify_playlists),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], UserQuestSpotifyPlaylist.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => quest_spotify_playlists_entity_1.QuestSpotifyPlaylists, (entity) => entity.user_quest_spotify_playlists),
    typeorm_1.JoinColumn({ name: 'quest_spotify_playlist_id' }),
    __metadata("design:type", quest_spotify_playlists_entity_1.QuestSpotifyPlaylists)
], UserQuestSpotifyPlaylist.prototype, "quest_spotify_playlists", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], UserQuestSpotifyPlaylist.prototype, "isrcs", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], UserQuestSpotifyPlaylist.prototype, "complete", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], UserQuestSpotifyPlaylist.prototype, "question_answered", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], UserQuestSpotifyPlaylist.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], UserQuestSpotifyPlaylist.prototype, "updated_at", void 0);
UserQuestSpotifyPlaylist = __decorate([
    typeorm_1.Entity('user_quest_spotify_playlists')
], UserQuestSpotifyPlaylist);
exports.UserQuestSpotifyPlaylist = UserQuestSpotifyPlaylist;
//# sourceMappingURL=user-quest-spotify-playlists.entity.js.map