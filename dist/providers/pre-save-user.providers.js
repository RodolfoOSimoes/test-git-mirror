"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preSaveUsersProviders = void 0;
const pre_save_users_entity_1 = require("../entities/pre-save-users.entity");
exports.preSaveUsersProviders = [
    {
        provide: 'PRE_SAVE_USER_REPOSITORY',
        useFactory: (connection) => connection.getRepository(pre_save_users_entity_1.PreSaveUser),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=pre-save-user.providers.js.map