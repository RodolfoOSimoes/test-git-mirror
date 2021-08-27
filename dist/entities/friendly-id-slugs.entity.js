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
exports.FriendlyIdSlug = void 0;
const typeorm_1 = require("typeorm");
let FriendlyIdSlug = class FriendlyIdSlug {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], FriendlyIdSlug.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: false }),
    __metadata("design:type", String)
], FriendlyIdSlug.prototype, "slug", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], FriendlyIdSlug.prototype, "sluggable_id", void 0);
__decorate([
    typeorm_1.Column({ length: 50, nullable: true }),
    __metadata("design:type", String)
], FriendlyIdSlug.prototype, "sluggable_type", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: false }),
    __metadata("design:type", String)
], FriendlyIdSlug.prototype, "scope", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], FriendlyIdSlug.prototype, "created_at", void 0);
FriendlyIdSlug = __decorate([
    typeorm_1.Entity('friendly_id_slugs')
], FriendlyIdSlug);
exports.FriendlyIdSlug = FriendlyIdSlug;
//# sourceMappingURL=friendly-id-slugs.entity.js.map