"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UserModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const user_providers_1 = require("../../providers/user.providers");
const database_module_1 = require("../../database/database.module");
const pagination_service_1 = require("../../utils/pagination/pagination.service");
const spotify_service_1 = require("../../apis/spotify/spotify.service");
let UserModule = UserModule_1 = class UserModule {
};
UserModule = UserModule_1 = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule],
        controllers: [user_controller_1.UserController],
        providers: [...user_providers_1.userProviders, user_service_1.UserService, pagination_service_1.PaginationService, spotify_service_1.SpotifyService],
        exports: [UserModule_1, user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map