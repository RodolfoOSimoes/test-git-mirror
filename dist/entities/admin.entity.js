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
exports.Admin = void 0;
const AdminRoles_1 = require("../enums/AdminRoles");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const badge_challenge_entity_1 = require("./badge-challenge.entity");
const campaign_entity_1 = require("./campaign.entity");
const comment_entity_1 = require("./comment.entity");
const log_session_entity_1 = require("./log-session.entity");
const product_entity_1 = require("./product.entity");
const rescue_entity_1 = require("./rescue.entity");
const setting_entity_1 = require("./setting.entity");
const user_gratification_entity_1 = require("./user-gratification.entity");
let Admin = class Admin {
};
__decorate([
    typeorm_2.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Admin.prototype, "id", void 0);
__decorate([
    typeorm_2.Column({ length: 255, unique: true, nullable: false }),
    __metadata("design:type", String)
], Admin.prototype, "email", void 0);
__decorate([
    typeorm_2.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Admin.prototype, "password_digest", void 0);
__decorate([
    typeorm_2.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Admin.prototype, "token_reset", void 0);
__decorate([
    typeorm_2.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Admin.prototype, "token", void 0);
__decorate([
    typeorm_2.VersionColumn({ nullable: true }),
    __metadata("design:type", Number)
], Admin.prototype, "lock_version", void 0);
__decorate([
    typeorm_2.Column({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Admin.prototype, "last_otp_at", void 0);
__decorate([
    typeorm_2.Column({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Admin.prototype, "update_password_time", void 0);
__decorate([
    typeorm_2.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Admin.prototype, "otp_secret", void 0);
__decorate([
    typeorm_2.Column({ type: 'boolean', default: false, nullable: true }),
    __metadata("design:type", Boolean)
], Admin.prototype, "status", void 0);
__decorate([
    typeorm_2.Column({ type: 'boolean', default: false, nullable: true }),
    __metadata("design:type", Boolean)
], Admin.prototype, "deleted", void 0);
__decorate([
    typeorm_2.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Admin.prototype, "created_at", void 0);
__decorate([
    typeorm_2.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Admin.prototype, "updated_at", void 0);
__decorate([
    typeorm_2.Column({
        type: 'enum',
        enum: [0, 1, 2, 3],
        default: AdminRoles_1.AdminRole.MASTER,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Admin.prototype, "roles", void 0);
__decorate([
    typeorm_1.OneToMany((type) => badge_challenge_entity_1.BadgeChallenge, (entity) => entity.admin),
    __metadata("design:type", Array)
], Admin.prototype, "badge_challenges", void 0);
__decorate([
    typeorm_1.OneToMany((type) => campaign_entity_1.Campaign, (entity) => entity.admin),
    __metadata("design:type", Array)
], Admin.prototype, "campaigns", void 0);
__decorate([
    typeorm_1.OneToMany((type) => comment_entity_1.Comment, (entity) => entity.admin),
    __metadata("design:type", Array)
], Admin.prototype, "comments", void 0);
__decorate([
    typeorm_1.OneToMany((type) => product_entity_1.Product, (entity) => entity.admin),
    __metadata("design:type", Array)
], Admin.prototype, "products", void 0);
__decorate([
    typeorm_1.OneToMany((type) => rescue_entity_1.Rescue, (entity) => entity.admin),
    __metadata("design:type", Array)
], Admin.prototype, "rescues", void 0);
__decorate([
    typeorm_1.OneToOne((type) => setting_entity_1.Setting, (entity) => entity.admin),
    __metadata("design:type", setting_entity_1.Setting)
], Admin.prototype, "settings", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_gratification_entity_1.UserGratification, (entity) => entity.admin),
    __metadata("design:type", Array)
], Admin.prototype, "userGratifications", void 0);
__decorate([
    typeorm_1.OneToMany((type) => log_session_entity_1.LogSession, (entity) => entity.admin),
    __metadata("design:type", Array)
], Admin.prototype, "log_sessions", void 0);
Admin = __decorate([
    typeorm_2.Entity('admins')
], Admin);
exports.Admin = Admin;
//# sourceMappingURL=admin.entity.js.map