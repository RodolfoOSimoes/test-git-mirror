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
exports.ArInternalMetadata = void 0;
const typeorm_1 = require("typeorm");
let ArInternalMetadata = class ArInternalMetadata {
};
__decorate([
    typeorm_1.PrimaryColumn({ length: 255, nullable: false }),
    __metadata("design:type", String)
], ArInternalMetadata.prototype, "key", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], ArInternalMetadata.prototype, "value", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], ArInternalMetadata.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], ArInternalMetadata.prototype, "updated_at", void 0);
ArInternalMetadata = __decorate([
    typeorm_1.Entity('ar_internal_metadata')
], ArInternalMetadata);
exports.ArInternalMetadata = ArInternalMetadata;
//# sourceMappingURL=ar-internal-metadata.entity.js.map