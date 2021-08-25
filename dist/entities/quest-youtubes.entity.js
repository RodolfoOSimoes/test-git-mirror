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
exports.QuestYoutubes = void 0;
const quest_entity_1 = require("./quest.entity");
const typeorm_1 = require("typeorm");
let QuestYoutubes = class QuestYoutubes {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], QuestYoutubes.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], QuestYoutubes.prototype, "url", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: [0, 1, 2],
        nullable: true,
    }),
    __metadata("design:type", Number)
], QuestYoutubes.prototype, "kind", void 0);
__decorate([
    typeorm_1.OneToOne((type) => quest_entity_1.Quest, (entity) => entity.quest_spotifies),
    typeorm_1.JoinColumn({ name: 'quest_id' }),
    __metadata("design:type", quest_entity_1.Quest)
], QuestYoutubes.prototype, "quest", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], QuestYoutubes.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], QuestYoutubes.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], QuestYoutubes.prototype, "name", void 0);
QuestYoutubes = __decorate([
    typeorm_1.Entity('quest_youtubes')
], QuestYoutubes);
exports.QuestYoutubes = QuestYoutubes;
//# sourceMappingURL=quest-youtubes.entity.js.map