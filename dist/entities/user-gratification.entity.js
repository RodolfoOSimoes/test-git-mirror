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
exports.UserGratification = void 0;
const admin_entity_1 = require("./admin.entity");
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
let UserGratification = class UserGratification {
};
__decorate([
    typeorm_2.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserGratification.prototype, "id", void 0);
__decorate([
    typeorm_2.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], UserGratification.prototype, "score", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.User, (entity) => entity.gratifications),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], UserGratification.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => admin_entity_1.Admin, (entity) => entity.userGratifications),
    typeorm_1.JoinColumn({ name: 'admin_id' }),
    __metadata("design:type", admin_entity_1.Admin)
], UserGratification.prototype, "admin", void 0);
__decorate([
    typeorm_2.Column({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], UserGratification.prototype, "deleted", void 0);
__decorate([
    typeorm_2.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], UserGratification.prototype, "kind", void 0);
__decorate([
    typeorm_2.Column({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], UserGratification.prototype, "is_cashback", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], UserGratification.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], UserGratification.prototype, "updated_at", void 0);
UserGratification = __decorate([
    typeorm_2.Entity('user_gratifications')
], UserGratification);
exports.UserGratification = UserGratification;
//# sourceMappingURL=user-gratification.entity.js.map