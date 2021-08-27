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
exports.UserChallenge = void 0;
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const badge_challenge_entity_1 = require("./badge-challenge.entity");
let UserChallenge = class UserChallenge {
};
__decorate([
    typeorm_2.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserChallenge.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.User, (entity) => entity.user_challenges),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], UserChallenge.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => badge_challenge_entity_1.BadgeChallenge, (entity) => entity.user_challenges),
    typeorm_1.JoinColumn({ name: 'badge_challenge_id' }),
    __metadata("design:type", badge_challenge_entity_1.BadgeChallenge)
], UserChallenge.prototype, "badge_challenge", void 0);
__decorate([
    typeorm_2.Column({ type: 'int', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], UserChallenge.prototype, "times", void 0);
__decorate([
    typeorm_2.Column({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], UserChallenge.prototype, "completed", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], UserChallenge.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], UserChallenge.prototype, "updated_at", void 0);
UserChallenge = __decorate([
    typeorm_2.Entity('user_challenges')
], UserChallenge);
exports.UserChallenge = UserChallenge;
//# sourceMappingURL=user-challenges.entity.js.map