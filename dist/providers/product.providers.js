"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productProviders = void 0;
const product_entity_1 = require("../entities/product.entity");
exports.productProviders = [
    {
        provide: 'PRODUCT_REPOSITORY',
        useFactory: (connection) => connection.getRepository(product_entity_1.Product),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=product.providers.js.map