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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("../admin/admin.service");
const mfa_service_1 = require("../../utils/mfa/mfa.service");
const ResponseInterface_1 = require("../../interfaces/ResponseInterface");
const bcrypt = require("bcrypt");
const auth_service_1 = require("../../auth/auth.service");
const sendMail_producer_service_1 = require("../../jobs/producers/sendMail-producer-service");
const AdminRoles_1 = require("../../enums/AdminRoles");
let SessionService = class SessionService {
    constructor(adminService, mfaService, authService, sendMailProducer) {
        this.adminService = adminService;
        this.mfaService = mfaService;
        this.authService = authService;
        this.sendMailProducer = sendMailProducer;
    }
    async login(loginInterface) {
        const admin = await this.adminService.findByEmail(loginInterface.login.email);
        if (!admin) {
            return {
                status: 401,
                message: 'E-mail não encontrado no sistema.',
            };
        }
        if (!admin.status) {
            return {
                status: 401,
                message: 'Sua conta está desativada.',
            };
        }
        if (bcrypt.compareSync(loginInterface.login.password + process.env.PASSWORD_SALT, admin.password_digest)) {
            const token = this.mfaService.generateToken(admin.otp_secret);
            this.sendMailProducer.sendToken(admin.email, token);
            return {
                status: 200,
                pre_token: admin.token,
                message: 'Verifique seu e-mail para obter o código de acesso.',
            };
        }
        return {
            status: 401,
            message: 'Senha incorreta. Você pode pedir uma nova senha clicando em "Esqueci minha senha".',
        };
    }
    async verifyCode(verify2faInterface) {
        var _a;
        try {
            const isTokenCorrect = this.mfaService.verifyToken(verify2faInterface.login.pre_token, verify2faInterface.login.code);
            if (isTokenCorrect) {
                const admin = await this.adminService.findByToken(verify2faInterface.login.pre_token);
                return {
                    status: 200,
                    access_token: await this.authService.login(admin),
                    roles: (_a = AdminRoles_1.AdminRole[admin.roles]) === null || _a === void 0 ? void 0 : _a.toLowerCase(),
                };
            }
            else {
                return { status: 403, message: 'Código inválido.' };
            }
        }
        catch (error) {
            console.error('SessionService::VerifyCode::Error::', error);
            return { status: 500, message: 'Ops, aconteceu um erro inesperado.' };
        }
    }
    async sendCode(sendCodeInterface) {
        try {
            const admin = await this.adminService.findByEmail(sendCodeInterface.email);
            const token = this.mfaService.generateToken(admin.otp_secret);
            this.sendMailProducer.sendToken(sendCodeInterface.email, token);
            return {
                status: 200,
                message: 'Verifique seu e-mail para obter o código de acesso.',
            };
        }
        catch (error) {
            console.log('SessionService::SendCode::Error::', error);
            return { status: 500, message: 'Ops, aconteceu um erro inesperado.' };
        }
    }
};
SessionService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        mfa_service_1.MfaService,
        auth_service_1.AuthService,
        sendMail_producer_service_1.SendMailProducerService])
], SessionService);
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map