"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const authentication_token_entity_1 = require("../../entities/authentication-token.entity");
const user_entity_1 = require("../../entities/user.entity");
const typeorm_1 = require("typeorm");
let AuthenticationService = class AuthenticationService {
    constructor(authenticationRepository) {
        this.authenticationRepository = authenticationRepository;
    }
    async create(requestInfo, user) {
        try {
            await this.authenticationRepository.save({
                body: requestInfo.body,
                user: user,
                last_used_at: new Date(),
                ip_address: requestInfo.ip_address,
                user_agent: requestInfo.user_agent,
                created_at: new Date(),
                updated_at: new Date(),
            });
        }
        catch (error) {
            console.log('AuthenticationService::Create::Erro ao salvar authentication token:: ', {
                requestInfo: requestInfo,
                userId: user.id,
                userEmail: user.email,
            });
        }
    }
};
AuthenticationService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('AUTHENTICATION_TOKEN_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map