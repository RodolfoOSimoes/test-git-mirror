"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badgeChallengeProviders = void 0;
const badge_challenge_entity_1 = require("../entities/badge-challenge.entity");
exports.badgeChallengeProviders = [
    {
        provide: 'BADGE_CHALLENGE_REPOSITORY',
        useFactory: (connection) => connection.getRepository(badge_challenge_entity_1.BadgeChallenge),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=badge-challenge.providers.js.map