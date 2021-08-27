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
exports.Order = void 0;
const user_entity_1 = require("./user.entity");
const product_entity_1 = require("./product.entity");
const typeorm_1 = require("typeorm");
const address_entity_1 = require("./address.entity");
let Order = class Order {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.User, (entity) => entity.orders),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Order.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => product_entity_1.Product, (entity) => entity.orders),
    typeorm_1.JoinColumn({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], Order.prototype, "product", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Order.prototype, "sent", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Order.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Order.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true, unique: true }),
    __metadata("design:type", String)
], Order.prototype, "code_secret", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: true, default: true }),
    __metadata("design:type", Boolean)
], Order.prototype, "confirmation_email", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "tracking_code", void 0);
__decorate([
    typeorm_1.Column({
        type: 'decimal',
        precision: 10,
        scale: 0,
        nullable: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], Order.prototype, "price_of_product", void 0);
__decorate([
    typeorm_1.OneToOne((type) => address_entity_1.Address, (entity) => entity.order),
    __metadata("design:type", address_entity_1.Address)
], Order.prototype, "address", void 0);
Order = __decorate([
    typeorm_1.Entity('orders')
], Order);
exports.Order = Order;
//# sourceMappingURL=order.entity.js.map