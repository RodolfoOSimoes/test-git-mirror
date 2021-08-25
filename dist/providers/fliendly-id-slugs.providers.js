"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendlyIdSlugProviders = void 0;
const friendly_id_slugs_entity_1 = require("../entities/friendly-id-slugs.entity");
exports.friendlyIdSlugProviders = [
    {
        provide: 'FRIENDLY_ID_SLUG_REPOSITORY',
        useFactory: (connection) => connection.getRepository(friendly_id_slugs_entity_1.FriendlyIdSlug),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=fliendly-id-slugs.providers.js.map