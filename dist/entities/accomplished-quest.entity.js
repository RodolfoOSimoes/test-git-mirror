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
exports.AccomplishedQuests = void 0;
const quest_entity_1 = require("./quest.entity");
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("typeorm");
let AccomplishedQuests = class AccomplishedQuests {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AccomplishedQuests.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => quest_entity_1.Quest, (entity) => entity.accomplished_quests),
    typeorm_1.JoinColumn({ name: 'quest_id' }),
    __metadata("design:type", quest_entity_1.Quest)
], AccomplishedQuests.prototype, "quest", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.User, (entity) => entity.accomplished_quests),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], AccomplishedQuests.prototype, "user", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], AccomplishedQuests.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], AccomplishedQuests.prototype, "updated_at", void 0);
AccomplishedQuests = __decorate([
    typeorm_1.Entity('accomplished_quests')
], AccomplishedQuests);
exports.AccomplishedQuests = AccomplishedQuests;
//# sourceMappingURL=accomplished-quest.entity.js.map