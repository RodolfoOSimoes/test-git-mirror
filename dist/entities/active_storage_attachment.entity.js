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
exports.ActiveStorageAttachment = void 0;
const typeorm_1 = require("typeorm");
const active_storage_blobs_entity_1 = require("./active_storage_blobs.entity");
let ActiveStorageAttachment = class ActiveStorageAttachment {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ActiveStorageAttachment.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: false }),
    __metadata("design:type", String)
], ActiveStorageAttachment.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: false, unique: true }),
    __metadata("design:type", String)
], ActiveStorageAttachment.prototype, "record_type", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], ActiveStorageAttachment.prototype, "record_id", void 0);
__decorate([
    typeorm_1.OneToOne((type) => active_storage_blobs_entity_1.ActiveStorageBlob, (entity) => entity.attachment),
    typeorm_1.JoinColumn({ name: 'blob_id' }),
    __metadata("design:type", active_storage_blobs_entity_1.ActiveStorageBlob)
], ActiveStorageAttachment.prototype, "blob", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: false }),
    __metadata("design:type", Date)
], ActiveStorageAttachment.prototype, "created_at", void 0);
ActiveStorageAttachment = __decorate([
    typeorm_1.Entity('active_storage_attachments')
], ActiveStorageAttachment);
exports.ActiveStorageAttachment = ActiveStorageAttachment;
//# sourceMappingURL=active_storage_attachment.entity.js.map