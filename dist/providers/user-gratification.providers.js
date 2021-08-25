"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userGratificationProviders = void 0;
const user_gratification_entity_1 = require("../entities/user-gratification.entity");
exports.userGratificationProviders = [
    {
        provide: 'USER_GRATIFICATION_REPOSITORY',
        useFactory: (connection) => connection.getRepository(user_gratification_entity_1.UserGratification),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=user-gratification.providers.js.map