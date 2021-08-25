"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MfaService = void 0;
const common_1 = require("@nestjs/common");
const speakeasy = require("speakeasy");
let MfaService = class MfaService {
    generateSecret() {
        return speakeasy.generateSecret({
            name: 'filtrgame',
            length: 16,
        });
    }
    generateToken(secret) {
        return speakeasy.totp({
            secret: secret,
            encoding: 'base32',
        });
    }
    verifyToken(secret, token) {
        return speakeasy.totp.verify({
            secret: secret,
            encoding: 'hex',
            window: 10,
            token: token,
        });
    }
};
MfaService = __decorate([
    common_1.Injectable()
], MfaService);
exports.MfaService = MfaService;
//# sourceMappingURL=mfa.service.js.map