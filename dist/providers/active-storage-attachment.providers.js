"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activeStorageAttachmentProviders = void 0;
const active_storage_attachment_entity_1 = require("../entities/active_storage_attachment.entity");
exports.activeStorageAttachmentProviders = [
    {
        provide: 'ACTIVE_STORAGE_ATTACHMENT_REPOSITORY',
        useFactory: (connection) => connection.getRepository(active_storage_attachment_entity_1.ActiveStorageAttachment),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=active-storage-attachment.providers.js.map