"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsProviders = void 0;
const setting_entity_1 = require("../entities/setting.entity");
exports.settingsProviders = [
    {
        provide: 'SETTINGS_REPOSITORY',
        useFactory: (connection) => connection.getRepository(setting_entity_1.Setting),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=settings.providers.js.map