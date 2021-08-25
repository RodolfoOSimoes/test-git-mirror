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
exports.CampaignUserBalance = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const campaign_entity_1 = require("./campaign.entity");
let CampaignUserBalance = class CampaignUserBalance {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CampaignUserBalance.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.User, (entity) => entity.campaign_user_balances),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], CampaignUserBalance.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => campaign_entity_1.Campaign, (entity) => entity.campaign_user_balances),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", campaign_entity_1.Campaign)
], CampaignUserBalance.prototype, "campaign", void 0);
__decorate([
    typeorm_1.Column({
        type: 'decimal',
        precision: 13,
        scale: 2,
        nullable: true,
        default: 0.0,
    }),
    __metadata("design:type", Number)
], CampaignUserBalance.prototype, "balance", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], CampaignUserBalance.prototype, "deleted", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], CampaignUserBalance.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], CampaignUserBalance.prototype, "updated_at", void 0);
CampaignUserBalance = __decorate([
    typeorm_1.Entity('campaign_user_balances')
], CampaignUserBalance);
exports.CampaignUserBalance = CampaignUserBalance;
//# sourceMappingURL=campaign-user-balance.entity.js.map