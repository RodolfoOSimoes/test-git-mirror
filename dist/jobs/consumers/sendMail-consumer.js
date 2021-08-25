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
exports.SendMailConsumer = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const bull_1 = require("@nestjs/bull");
let SendMailConsumer = class SendMailConsumer {
    constructor(mailService) {
        this.mailService = mailService;
    }
    async sendMailJob(job) {
        const { data } = job;
        try {
            await this.mailService.sendMail({
                from: `"Filtrgame" <${process.env.SMTP_USER}>`,
                to: data.to,
                subject: 'Código de validação',
                html: `<h1>Código de validação: ${data.token}</h1>`,
            });
        }
        catch (error) {
            throw Error(error.message);
        }
    }
    async sendNewPasswordMail(job) {
        const { data } = job;
        try {
            await this.mailService.sendMail({
                from: `"Filtrgame" <${process.env.SMTP_USER}>`,
                to: data.email,
                subject: 'Nova senha gerada com sucesso',
                html: `<h1>Nova senha gerada com sucesso: ${data.password.toString()}</h1>`,
            });
        }
        catch (error) {
            throw Error(error.message);
        }
    }
    async sendOrderMailJob(job) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        const { data } = job;
        try {
            const html = `Oi! ${(_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.name}<br><br>
       
       Seu resgate foi confirmado :)<br><br>
       
       Obrigada por participar do Filtr Game! Agora vamos separar seu resgate e em breve ele será entregue a transportadora.<br>
       
       Entrega de 7 a 30 dias úteis.<br><br>
    
       <b>${(_b = data === null || data === void 0 ? void 0 : data.product) === null || _b === void 0 ? void 0 : _b.name}</b><br>
    
       f$ ${(_c = data === null || data === void 0 ? void 0 : data.product) === null || _c === void 0 ? void 0 : _c.value}<br><br>
    
       Frete grátis<br>
    
       ${(_d = data === null || data === void 0 ? void 0 : data.address) === null || _d === void 0 ? void 0 : _d.street}<br>
    
       Número: ${(_e = data === null || data === void 0 ? void 0 : data.address) === null || _e === void 0 ? void 0 : _e.number}<br>

       Bairro: ${(_f = data === null || data === void 0 ? void 0 : data.address) === null || _f === void 0 ? void 0 : _f.neighborhood}<br>

       Complemento: ${(_g = data === null || data === void 0 ? void 0 : data.address) === null || _g === void 0 ? void 0 : _g.complement}<br>

       Cep: ${(_h = data === null || data === void 0 ? void 0 : data.address) === null || _h === void 0 ? void 0 : _h.cep}<br>

       ${(_k = (_j = data === null || data === void 0 ? void 0 : data.address) === null || _j === void 0 ? void 0 : _j.city) === null || _k === void 0 ? void 0 : _k.name} - ${(_o = (_m = (_l = data === null || data === void 0 ? void 0 : data.address) === null || _l === void 0 ? void 0 : _l.city) === null || _m === void 0 ? void 0 : _m.state) === null || _o === void 0 ? void 0 : _o.acronym}

       <br><br>
       Continue ligado nas novidades do <a href="${process.env.FILTRGAME_URL}" target="_blank">Filtr Game</a>.
       <br><br>
       Grande abraço! :-)`;
            await this.mailService.sendMail({
                from: `"Filtrgame" <${process.env.SMTP_USER}>`,
                to: data.user.email,
                subject: 'Recebemos seu pedido!',
                html: html,
            });
        }
        catch (error) {
            console.log(error);
            throw Error(error.message);
        }
    }
};
__decorate([
    bull_1.Process('sendMail-job'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SendMailConsumer.prototype, "sendMailJob", null);
__decorate([
    bull_1.Process('sendNewPasswordMail-job'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SendMailConsumer.prototype, "sendNewPasswordMail", null);
__decorate([
    bull_1.Process('sendOrderMail-job'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SendMailConsumer.prototype, "sendOrderMailJob", null);
SendMailConsumer = __decorate([
    bull_1.Processor('sendMail-queue'),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], SendMailConsumer);
exports.SendMailConsumer = SendMailConsumer;
//# sourceMappingURL=sendMail-consumer.js.map