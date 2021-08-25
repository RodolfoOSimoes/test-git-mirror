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
exports.QuestPreSaves = void 0;
const quest_entity_1 = require("./quest.entity");
const typeorm_1 = require("typeorm");
const pre_save_users_entity_1 = require("./pre-save-users.entity");
let QuestPreSaves = class QuestPreSaves {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], QuestPreSaves.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], QuestPreSaves.prototype, "uri", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], QuestPreSaves.prototype, "name_artist", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], QuestPreSaves.prototype, "name_product", void 0);
__decorate([
    typeorm_1.Column({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], QuestPreSaves.prototype, "launch_in", void 0);
__decorate([
    typeorm_1.OneToOne((type) => quest_entity_1.Quest, (entity) => entity.quest_pre_saves),
    typeorm_1.JoinColumn({ name: 'quest_id' }),
    __metadata("design:type", quest_entity_1.Quest)
], QuestPreSaves.prototype, "quest", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], QuestPreSaves.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], QuestPreSaves.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.OneToMany((type) => pre_save_users_entity_1.PreSaveUser, (entity) => entity.quest_pre_save),
    __metadata("design:type", Array)
], QuestPreSaves.prototype, "pre_save_users", void 0);
QuestPreSaves = __decorate([
    typeorm_1.Entity('quest_pre_saves')
], QuestPreSaves);
exports.QuestPreSaves = QuestPreSaves;
//# sourceMappingURL=quest-pre-saves.entity.js.map