"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressProviders = void 0;
const address_entity_1 = require("../entities/address.entity");
exports.addressProviders = [
    {
        provide: 'ADDRESS_REPOSITORY',
        useFactory: (connection) => connection.getRepository(address_entity_1.Address),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=address.providers.js.map