"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arInternalMetadataProviders = void 0;
const ar_internal_metadata_entity_1 = require("../entities/ar-internal-metadata.entity");
exports.arInternalMetadataProviders = [
    {
        provide: 'AR_INTERNAL_METADATA_REPOSITORY',
        useFactory: (connection) => connection.getRepository(ar_internal_metadata_entity_1.ArInternalMetadata),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=ar-internal-metadata.providers.js.map