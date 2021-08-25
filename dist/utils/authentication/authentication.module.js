"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthenticationModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../../database/database.module");
const authentication_token_providers_1 = require("../../providers/authentication-token.providers");
const authentication_service_1 = require("./authentication.service");
let AuthenticationModule = AuthenticationModule_1 = class AuthenticationModule {
};
AuthenticationModule = AuthenticationModule_1 = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule],
        providers: [...authentication_token_providers_1.authenticationTokenProviders, authentication_service_1.AuthenticationService],
        exports: [authentication_service_1.AuthenticationService, AuthenticationModule_1],
    })
], AuthenticationModule);
exports.AuthenticationModule = AuthenticationModule;
//# sourceMappingURL=authentication.module.js.map