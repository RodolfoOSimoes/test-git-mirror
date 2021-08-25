"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userChallengeProviders = void 0;
const user_challenges_entity_1 = require("../entities/user-challenges.entity");
exports.userChallengeProviders = [
    {
        provide: 'USER_CHALLENGE_REPOSITORY',
        useFactory: (connection) => connection.getRepository(user_challenges_entity_1.UserChallenge),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=user-challenge.providers.js.map