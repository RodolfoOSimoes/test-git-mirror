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
exports.Campaign = void 0;
const admin_entity_1 = require("./admin.entity");
const typeorm_1 = require("typeorm");
const statement_entity_1 = require("./statement.entity");
const campaign_user_balance_entity_1 = require("./campaign-user-balance.entity");
let Campaign = class Campaign {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Campaign.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Campaign.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true, unique: true }),
    __metadata("design:type", String)
], Campaign.prototype, "slug", void 0);
__decorate([
    typeorm_1.Column({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Campaign.prototype, "date_finish", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Campaign.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Campaign.prototype, "deleted", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => admin_entity_1.Admin, (entity) => entity.campaigns),
    typeorm_1.JoinColumn({ name: 'admin_id' }),
    __metadata("design:type", admin_entity_1.Admin)
], Campaign.prototype, "admin", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Campaign.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Campaign.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Campaign.prototype, "users_count", void 0);
__decorate([
    typeorm_1.Column({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Campaign.prototype, "date_start", void 0);
__decorate([
    typeorm_1.OneToMany((type) => statement_entity_1.Statement, (entity) => entity.campaign),
    __metadata("design:type", Array)
], Campaign.prototype, "statements", void 0);
__decorate([
    typeorm_1.OneToMany((type) => campaign_user_balance_entity_1.CampaignUserBalance, (entity) => entity.campaign),
    __metadata("design:type", Array)
], Campaign.prototype, "campaign_user_balances", void 0);
Campaign = __decorate([
    typeorm_1.Entity('campaigns')
], Campaign);
exports.Campaign = Campaign;
//# sourceMappingURL=campaign.entity.js.map