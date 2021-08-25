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
exports.SendMailProducerService = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const address_entity_1 = require("../../entities/address.entity");
const product_entity_1 = require("../../entities/product.entity");
const user_entity_1 = require("../../entities/user.entity");
let SendMailProducerService = class SendMailProducerService {
    constructor(tokenQueue) {
        this.tokenQueue = tokenQueue;
    }
    async sendToken(to, token) {
        const data = {
            to: to,
            token: token,
        };
        await this.tokenQueue.add('sendMail-job', data);
    }
    async sendOrderEmail(user, product, address) {
        const data = {
            user: user,
            product: product,
            address: address,
        };
        await this.tokenQueue.add('sendOrderMail-job', data);
    }
    async sendNewPasswordEmail(email, password) {
        const data = {
            email: email,
            password: password,
        };
        await this.tokenQueue.add('sendNewPasswordMail-job', data);
    }
};
SendMailProducerService = __decorate([
    common_1.Injectable(),
    __param(0, bull_1.InjectQueue('sendMail-queue')),
    __metadata("design:paramtypes", [Object])
], SendMailProducerService);
exports.SendMailProducerService = SendMailProducerService;
//# sourceMappingURL=sendMail-producer-service.js.map