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
exports.City = void 0;
const state_entity_1 = require("./state.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const address_entity_1 = require("./address.entity");
let City = class City {
};
__decorate([
    typeorm_2.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], City.prototype, "id", void 0);
__decorate([
    typeorm_2.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], City.prototype, "name", void 0);
__decorate([
    typeorm_2.Column({ type: 'boolean', default: false, nullable: true }),
    __metadata("design:type", Boolean)
], City.prototype, "capital", void 0);
__decorate([
    typeorm_1.OneToOne((type) => address_entity_1.Address, (entity) => entity.city),
    __metadata("design:type", address_entity_1.Address)
], City.prototype, "address", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => state_entity_1.State, (entity) => entity.cities),
    typeorm_1.JoinColumn({ name: 'state_id' }),
    __metadata("design:type", state_entity_1.State)
], City.prototype, "state", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], City.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], City.prototype, "updated_at", void 0);
City = __decorate([
    typeorm_2.Entity('cities')
], City);
exports.City = City;
//# sourceMappingURL=city.entity.js.map