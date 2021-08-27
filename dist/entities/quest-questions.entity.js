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
exports.QuestQuestions = void 0;
const quest_entity_1 = require("./quest.entity");
const typeorm_1 = require("typeorm");
let QuestQuestions = class QuestQuestions {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], QuestQuestions.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], QuestQuestions.prototype, "question", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], QuestQuestions.prototype, "answer", void 0);
__decorate([
    typeorm_1.OneToOne((type) => quest_entity_1.Quest, (entity) => entity.quest_questions),
    typeorm_1.JoinColumn({ name: 'quest_id' }),
    __metadata("design:type", quest_entity_1.Quest)
], QuestQuestions.prototype, "quest", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], QuestQuestions.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], QuestQuestions.prototype, "updated_at", void 0);
QuestQuestions = __decorate([
    typeorm_1.Entity('quest_questions')
], QuestQuestions);
exports.QuestQuestions = QuestQuestions;
//# sourceMappingURL=quest-questions.entity.js.map