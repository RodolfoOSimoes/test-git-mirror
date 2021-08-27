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
exports.Setting = void 0;
const admin_entity_1 = require("./admin.entity");
const typeorm_1 = require("typeorm");
let Setting = class Setting {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Setting.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Setting.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Setting.prototype, "subtitle", void 0);
__decorate([
    typeorm_1.OneToOne((type) => admin_entity_1.Admin, (entity) => entity.settings),
    typeorm_1.JoinColumn({ name: 'admin_update_id' }),
    __metadata("design:type", admin_entity_1.Admin)
], Setting.prototype, "admin", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Setting.prototype, "terms_and_conditions", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Setting.prototype, "invitation_quantity", void 0);
__decorate([
    typeorm_1.Column({ type: 'double', nullable: true }),
    __metadata("design:type", Number)
], Setting.prototype, "invitation_score", void 0);
__decorate([
    typeorm_1.Column({ type: 'double', nullable: true }),
    __metadata("design:type", Number)
], Setting.prototype, "profile_completed_score", void 0);
__decorate([
    typeorm_1.Column({ type: 'double', nullable: true }),
    __metadata("design:type", Number)
], Setting.prototype, "limited_gratification_score", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Setting.prototype, "uri_playlist", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Setting.prototype, "show_playlist", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Setting.prototype, "splash_screen_title", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Setting.prototype, "splash_screen_message", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', default: true, nullable: true }),
    __metadata("design:type", Boolean)
], Setting.prototype, "enabled_splash_screen", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", String)
], Setting.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", String)
], Setting.prototype, "updated_at", void 0);
Setting = __decorate([
    typeorm_1.Entity('settings')
], Setting);
exports.Setting = Setting;
//# sourceMappingURL=setting.entity.js.map