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
exports.NewsLetter = void 0;
const typeorm_1 = require("typeorm");
let NewsLetter = class NewsLetter {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], NewsLetter.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], NewsLetter.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], NewsLetter.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], NewsLetter.prototype, "opt", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], NewsLetter.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], NewsLetter.prototype, "updated_at", void 0);
NewsLetter = __decorate([
    typeorm_1.Entity('newsllaters')
], NewsLetter);
exports.NewsLetter = NewsLetter;
//# sourceMappingURL=newsletter.entity.js.map