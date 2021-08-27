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
exports.Product = void 0;
const admin_entity_1 = require("./admin.entity");
const badge_challenge_entity_1 = require("./badge-challenge.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./order.entity");
let Product = class Product {
};
__decorate([
    typeorm_2.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: false, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "value", void 0);
__decorate([
    typeorm_1.Column({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Product.prototype, "date_start", void 0);
__decorate([
    typeorm_1.Column({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Product.prototype, "date_finish", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "deleted", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "quantity", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "quantities_purchased", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "code_product", void 0);
__decorate([
    typeorm_1.VersionColumn({ nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "lock_version", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => admin_entity_1.Admin, (entity) => entity.products),
    typeorm_2.JoinColumn({ name: 'admin_id' }),
    __metadata("design:type", admin_entity_1.Admin)
], Product.prototype, "admin", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Product.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Product.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "kind", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => badge_challenge_entity_1.BadgeChallenge, (entity) => entity.products),
    typeorm_2.JoinColumn({ name: 'badge_challenge_id' }),
    __metadata("design:type", badge_challenge_entity_1.BadgeChallenge)
], Product.prototype, "badge", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    typeorm_1.OneToMany((type) => order_entity_1.Order, (entity) => entity.product),
    __metadata("design:type", Array)
], Product.prototype, "orders", void 0);
Product = __decorate([
    typeorm_2.Entity('products')
], Product);
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map