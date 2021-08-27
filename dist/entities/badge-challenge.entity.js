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
exports.BadgeChallenge = void 0;
const admin_entity_1 = require("./admin.entity");
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const badge_entity_1 = require("./badge.entity");
const user_challenges_entity_1 = require("./user-challenges.entity");
let BadgeChallenge = class BadgeChallenge {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BadgeChallenge.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], BadgeChallenge.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], BadgeChallenge.prototype, "uri", void 0);
__decorate([
    typeorm_1.Column({ type: 'json', nullable: true }),
    __metadata("design:type", String)
], BadgeChallenge.prototype, "info", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], BadgeChallenge.prototype, "goal", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], BadgeChallenge.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], BadgeChallenge.prototype, "deleted", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => admin_entity_1.Admin, (entity) => entity.badge_challenges),
    typeorm_1.JoinColumn({ name: 'admin_id' }),
    __metadata("design:type", admin_entity_1.Admin)
], BadgeChallenge.prototype, "admin", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], BadgeChallenge.prototype, "completed_users_count", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], BadgeChallenge.prototype, "total_times_of_streamings", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], BadgeChallenge.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], BadgeChallenge.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], BadgeChallenge.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: true, default: true }),
    __metadata("design:type", Boolean)
], BadgeChallenge.prototype, "voucher", void 0);
__decorate([
    typeorm_1.OneToMany((type) => product_entity_1.Product, (entity) => entity.badge),
    __metadata("design:type", Array)
], BadgeChallenge.prototype, "products", void 0);
__decorate([
    typeorm_1.OneToMany((type) => badge_entity_1.Badge, (entity) => entity.badge_challenge),
    __metadata("design:type", Array)
], BadgeChallenge.prototype, "badges", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_challenges_entity_1.UserChallenge, (entity) => entity.badge_challenge),
    __metadata("design:type", Array)
], BadgeChallenge.prototype, "user_challenges", void 0);
BadgeChallenge = __decorate([
    typeorm_1.Entity('badge_challenges')
], BadgeChallenge);
exports.BadgeChallenge = BadgeChallenge;
//# sourceMappingURL=badge-challenge.entity.js.map