"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsletterProviders = void 0;
const newsletter_entity_1 = require("../entities/newsletter.entity");
exports.newsletterProviders = [
    {
        provide: 'NEWSLETTER_REPOSITORY',
        useFactory: (connection) => connection.getRepository(newsletter_entity_1.NewsLetter),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=newsletter.providers.js.map