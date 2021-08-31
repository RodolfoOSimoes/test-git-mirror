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
exports.Withdrawal = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let Withdrawal = class Withdrawal {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Withdrawal.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Withdrawal.prototype, "date_spent", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.User, (entity) => entity.withdrawals),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Withdrawal.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({
        type: 'decimal',
        precision: 13,
        scale: 2,
        nullable: true,
        default: 0.0,
    }),
    __metadata("design:type", Number)
], Withdrawal.prototype, "spending", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Withdrawal.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Withdrawal.prototype, "updated_at", void 0);
Withdrawal = __decorate([
    typeorm_1.Entity('withdrawals')
], Withdrawal);
exports.Withdrawal = Withdrawal;
//# sourceMappingURL=withdrawals.entity.js.map