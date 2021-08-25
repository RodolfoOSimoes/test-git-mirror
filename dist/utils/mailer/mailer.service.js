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
exports.MailerService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
let MailerService = class MailerService {
    constructor(mailService) {
        this.mailService = mailService;
    }
    async sendToken(to, token) {
        try {
            await this.mailService.sendMail({
                from: `"Filtrgame" <${process.env.SMTP_USER}>`,
                to: to,
                subject: 'Código de validação',
                text: `Código de validação: ${token}`,
                html: `<h1>Código de validação: ${token}</h1>`,
            });
        }
        catch (error) {
            throw Error(error.message);
        }
    }
    async sendNewPassword(to, password) {
        try {
            await this.mailService.sendMail({
                from: `"Filtrgame" <${process.env.SMTP_USER}>`,
                to: to,
                subject: 'Nova senha gerada com sucesso',
                text: `Nova senha gerada com sucesso: ${password}`,
                html: `<h1>Nova senha gerada com sucesso: ${password}</h1>`,
            });
        }
        catch (error) {
            throw Error(error.message);
        }
    }
};
MailerService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailerService);
exports.MailerService = MailerService;
//# sourceMappingURL=mailer.service.js.map