"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cityProviders = void 0;
const city_entity_1 = require("../entities/city.entity");
exports.cityProviders = [
    {
        provide: 'CITY_REPOSITORY',
        useFactory: (connection) => connection.getRepository(city_entity_1.City),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=city.providers.js.map