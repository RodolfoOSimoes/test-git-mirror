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
exports.Rescue = void 0;
const admin_entity_1 = require("./admin.entity");
const typeorm_1 = require("typeorm");
const cash_backs_entity_1 = require("./cash-backs.entity");
const rescue_counts_entity_1 = require("./rescue-counts.entity");
let Rescue = class Rescue {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Rescue.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Rescue.prototype, "uri", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Rescue.prototype, "uid", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Rescue.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Rescue.prototype, "artists", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Rescue.prototype, "cover_url", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Rescue.prototype, "score", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => admin_entity_1.Admin, (entity) => entity.rescues),
    typeorm_1.JoinColumn({ name: 'admin_id' }),
    __metadata("design:type", admin_entity_1.Admin)
], Rescue.prototype, "admin", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: true, default: true }),
    __metadata("design:type", Boolean)
], Rescue.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Rescue.prototype, "deleted", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Rescue.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Rescue.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Rescue.prototype, "rescues_count", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Rescue.prototype, "priority", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Rescue.prototype, "isrc", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Rescue.prototype, "playlist", void 0);
__decorate([
    typeorm_1.Column({ type: 'json', nullable: true }),
    __metadata("design:type", String)
], Rescue.prototype, "info_playlist", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Rescue.prototype, "limited", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Rescue.prototype, "limit_streams", void 0);
__decorate([
    typeorm_1.OneToMany((type) => cash_backs_entity_1.CashBack, (entity) => entity.rescue),
    __metadata("design:type", Array)
], Rescue.prototype, "cashbacks", void 0);
__decorate([
    typeorm_1.OneToMany((type) => rescue_counts_entity_1.RescueCount, (entity) => entity.rescue),
    __metadata("design:type", Array)
], Rescue.prototype, "rescue_counts", void 0);
Rescue = __decorate([
    typeorm_1.Entity('rescues')
], Rescue);
exports.Rescue = Rescue;
//# sourceMappingURL=rescue.entity.js.map