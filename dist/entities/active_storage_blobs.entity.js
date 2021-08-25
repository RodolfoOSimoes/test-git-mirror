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
exports.ActiveStorageBlob = void 0;
const typeorm_1 = require("typeorm");
const active_storage_attachment_entity_1 = require("./active_storage_attachment.entity");
let ActiveStorageBlob = class ActiveStorageBlob {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ActiveStorageBlob.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: false, unique: true }),
    __metadata("design:type", String)
], ActiveStorageBlob.prototype, "key", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: false }),
    __metadata("design:type", String)
], ActiveStorageBlob.prototype, "filename", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], ActiveStorageBlob.prototype, "content_type", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ActiveStorageBlob.prototype, "metadata", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], ActiveStorageBlob.prototype, "byte_size", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: false }),
    __metadata("design:type", String)
], ActiveStorageBlob.prototype, "checksum", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], ActiveStorageBlob.prototype, "created_at", void 0);
__decorate([
    typeorm_1.OneToOne((type) => active_storage_attachment_entity_1.ActiveStorageAttachment, (entity) => entity.blob),
    __metadata("design:type", active_storage_attachment_entity_1.ActiveStorageAttachment)
], ActiveStorageBlob.prototype, "attachment", void 0);
ActiveStorageBlob = __decorate([
    typeorm_1.Entity('active_storage_blobs')
], ActiveStorageBlob);
exports.ActiveStorageBlob = ActiveStorageBlob;
//# sourceMappingURL=active_storage_blobs.entity.js.map