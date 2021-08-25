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
exports.Comment = void 0;
const admin_entity_1 = require("./admin.entity");
const typeorm_1 = require("typeorm");
let Comment = class Comment {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Comment.prototype, "body", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => admin_entity_1.Admin, (entity) => entity.comments),
    typeorm_1.JoinColumn({ name: 'admin_id' }),
    __metadata("design:type", admin_entity_1.Admin)
], Comment.prototype, "admin", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Comment.prototype, "commentable_type", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Comment.prototype, "commentable_id", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Comment.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Comment.prototype, "deleted", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Comment.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Comment.prototype, "updated_at", void 0);
Comment = __decorate([
    typeorm_1.Entity('comments')
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=comment.entity.js.map