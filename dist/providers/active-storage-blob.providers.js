"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activeStorageBlobProviders = void 0;
const active_storage_blobs_entity_1 = require("../entities/active_storage_blobs.entity");
exports.activeStorageBlobProviders = [
    {
        provide: 'ACTIVE_STORAGE_BLOB_REPOSITORY',
        useFactory: (connection) => connection.getRepository(active_storage_blobs_entity_1.ActiveStorageBlob),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=active-storage-blob.providers.js.map