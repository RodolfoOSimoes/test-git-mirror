"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderProviders = void 0;
const order_entity_1 = require("../entities/order.entity");
exports.orderProviders = [
    {
        provide: 'ORDER_REPOSITORY',
        useFactory: (connection) => connection.getRepository(order_entity_1.Order),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=order.providers.js.map