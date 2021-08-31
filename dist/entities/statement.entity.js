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
exports.Statement = void 0;
const campaign_entity_1 = require("./campaign.entity");
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("typeorm");
let Statement = class Statement {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Statement.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.User, (entity) => entity.statements),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Statement.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => campaign_entity_1.Campaign, (entity) => entity.statements),
    typeorm_1.JoinColumn({ name: 'campaign_id' }),
    __metadata("design:type", campaign_entity_1.Campaign)
], Statement.prototype, "campaign", void 0);
__decorate([
    typeorm_1.Column({
        type: 'decimal',
        precision: 13,
        scale: 2,
        nullable: true,
        default: 0.0,
    }),
    __metadata("design:type", Number)
], Statement.prototype, "amount", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Statement.prototype, "kind", void 0);
__decorate([
    typeorm_1.Column({
        type: 'decimal',
        precision: 13,
        scale: 2,
        nullable: true,
        default: 0.0,
    }),
    __metadata("design:type", Number)
], Statement.prototype, "balance", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Statement.prototype, "statementable_type", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Statement.prototype, "statementable_id", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Statement.prototype, "deleted", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Statement.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Statement.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Statement.prototype, "code_doc", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Statement.prototype, "statementable_type_action", void 0);
__decorate([
    typeorm_1.Column({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Statement.prototype, "expiration_date", void 0);
Statement = __decorate([
    typeorm_1.Index(['statementable_type', 'statementable_id']),
    typeorm_1.Index(['code_doc']),
    typeorm_1.Entity('statements')
], Statement);
exports.Statement = Statement;
//# sourceMappingURL=statement.entity.js.map