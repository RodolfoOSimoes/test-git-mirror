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
exports.CashBack = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const rescue_entity_1 = require("./rescue.entity");
const user_entity_1 = require("./user.entity");
let CashBack = class CashBack {
};
__decorate([
    typeorm_2.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CashBack.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.User, (entity) => entity.cashbacks),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], CashBack.prototype, "user", void 0);
__decorate([
    typeorm_2.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], CashBack.prototype, "track_id", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], CashBack.prototype, "played_at", void 0);
__decorate([
    typeorm_2.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], CashBack.prototype, "name", void 0);
__decorate([
    typeorm_2.Column({ type: 'boolean', default: false, nullable: true }),
    __metadata("design:type", Boolean)
], CashBack.prototype, "deleted", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => rescue_entity_1.Rescue, (entity) => entity.cashbacks),
    typeorm_1.JoinColumn({ name: 'rescue_id' }),
    __metadata("design:type", rescue_entity_1.Rescue)
], CashBack.prototype, "rescue", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], CashBack.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], CashBack.prototype, "updated_at", void 0);
CashBack = __decorate([
    typeorm_2.Entity('cash_backs')
], CashBack);
exports.CashBack = CashBack;
//# sourceMappingURL=cash-backs.entity.js.map