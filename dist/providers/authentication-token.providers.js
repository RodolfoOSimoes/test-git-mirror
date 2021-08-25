"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationTokenProviders = void 0;
const authentication_token_entity_1 = require("../entities/authentication-token.entity");
exports.authenticationTokenProviders = [
    {
        provide: 'AUTHENTICATION_TOKEN_REPOSITORY',
        useFactory: (connection) => connection.getRepository(authentication_token_entity_1.AuthenticationToken),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=authentication-token.providers.js.map