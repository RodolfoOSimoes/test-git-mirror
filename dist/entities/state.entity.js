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
exports.State = void 0;
const region_entity_1 = require("./region.entity");
const typeorm_1 = require("typeorm");
const city_entity_1 = require("./city.entity");
let State = class State {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], State.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], State.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], State.prototype, "acronym", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => region_entity_1.Region, (entity) => entity.states),
    typeorm_1.JoinColumn({ name: 'region_id' }),
    __metadata("design:type", region_entity_1.Region)
], State.prototype, "region", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], State.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], State.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.OneToMany((type) => city_entity_1.City, (entity) => entity.state),
    __metadata("design:type", Array)
], State.prototype, "cities", void 0);
State = __decorate([
    typeorm_1.Entity('states')
], State);
exports.State = State;
//# sourceMappingURL=state.entity.js.map