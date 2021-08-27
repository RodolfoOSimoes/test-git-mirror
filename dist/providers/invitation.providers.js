"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invitationProviders = void 0;
const invitations_entity_1 = require("../entities/invitations.entity");
exports.invitationProviders = [
    {
        provide: 'INVITATION_REPOSITORY',
        useFactory: (connection) => connection.getRepository(invitations_entity_1.Invitation),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=invitation.providers.js.map