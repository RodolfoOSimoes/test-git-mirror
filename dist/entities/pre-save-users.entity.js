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
exports.PreSaveUser = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const quest_pre_saves_entity_1 = require("./quest-pre-saves.entity");
let PreSaveUser = class PreSaveUser {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PreSaveUser.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.User, (entity) => entity.pre_save_users),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], PreSaveUser.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => quest_pre_saves_entity_1.QuestPreSaves, (entity) => entity.pre_save_users),
    typeorm_1.JoinColumn({ name: 'quest_pre_save_id' }),
    __metadata("design:type", quest_pre_saves_entity_1.QuestPreSaves)
], PreSaveUser.prototype, "quest_pre_save", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], PreSaveUser.prototype, "saved", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], PreSaveUser.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], PreSaveUser.prototype, "updated_at", void 0);
PreSaveUser = __decorate([
    typeorm_1.Entity('pre_save_users')
], PreSaveUser);
exports.PreSaveUser = PreSaveUser;
//# sourceMappingURL=pre-save-users.entity.js.map