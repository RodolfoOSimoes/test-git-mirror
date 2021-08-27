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
exports.RescueCount = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const rescue_entity_1 = require("./rescue.entity");
let RescueCount = class RescueCount {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], RescueCount.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.User, (entity) => entity.rescue_counts),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], RescueCount.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => rescue_entity_1.Rescue, (entity) => entity.rescue_counts),
    typeorm_1.JoinColumn({ name: 'rescue_id' }),
    __metadata("design:type", rescue_entity_1.Rescue)
], RescueCount.prototype, "rescue", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], RescueCount.prototype, "times", void 0);
__decorate([
    typeorm_1.Column({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], RescueCount.prototype, "created_date", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], RescueCount.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], RescueCount.prototype, "updated_at", void 0);
RescueCount = __decorate([
    typeorm_1.Entity('rescue_counts')
], RescueCount);
exports.RescueCount = RescueCount;
//# sourceMappingURL=rescue-counts.entity.js.map