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
exports.QuestSpotifies = void 0;
const quest_entity_1 = require("./quest.entity");
const typeorm_1 = require("typeorm");
let QuestSpotifies = class QuestSpotifies {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], QuestSpotifies.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], QuestSpotifies.prototype, "uri", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], QuestSpotifies.prototype, "uid", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], QuestSpotifies.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: [0, 1, 2, 3],
        nullable: true,
    }),
    __metadata("design:type", Number)
], QuestSpotifies.prototype, "kind", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], QuestSpotifies.prototype, "to_listen", void 0);
__decorate([
    typeorm_1.OneToOne((type) => quest_entity_1.Quest, (entity) => entity.quest_spotifies),
    typeorm_1.JoinColumn({ name: 'quest_id' }),
    __metadata("design:type", quest_entity_1.Quest)
], QuestSpotifies.prototype, "quest", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], QuestSpotifies.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], QuestSpotifies.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], QuestSpotifies.prototype, "isrc", void 0);
QuestSpotifies = __decorate([
    typeorm_1.Entity('quest_spotifies')
], QuestSpotifies);
exports.QuestSpotifies = QuestSpotifies;
//# sourceMappingURL=quest-spotifies.entity.js.map