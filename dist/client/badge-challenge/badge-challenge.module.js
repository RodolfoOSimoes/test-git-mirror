"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeChallengeModule = void 0;
const common_1 = require("@nestjs/common");
const badge_challenge_service_1 = require("./badge-challenge.service");
const badge_challenge_controller_1 = require("./badge-challenge.controller");
const database_module_1 = require("../../database/database.module");
const badge_challenge_providers_1 = require("../../providers/badge-challenge.providers");
let BadgeChallengeModule = class BadgeChallengeModule {
};
BadgeChallengeModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule],
        controllers: [badge_challenge_controller_1.BadgeChallengeController],
        providers: [...badge_challenge_providers_1.badgeChallengeProviders, badge_challenge_service_1.BadgeChallengeService],
    })
], BadgeChallengeModule);
exports.BadgeChallengeModule = BadgeChallengeModule;
//# sourceMappingURL=badge-challenge.module.js.map