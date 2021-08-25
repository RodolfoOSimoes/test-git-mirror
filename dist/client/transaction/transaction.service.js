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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../entities/user.entity");
const date_utils_1 = require("../../utils/date.utils");
const typeorm_1 = require("typeorm");
let TransactionService = class TransactionService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findAll(id) {
        const user = await this.userRepository.findOne(id, {
            relations: ['extracts'],
            order: { id: 'ASC' },
        });
        const data = user.extracts.map((extract) => {
            return {
                id: extract.id,
                type: 'transactions',
                created_at: date_utils_1.formatDate(extract.created_at),
                deposit: extract.deposit,
                expiration_date: this.formatExpireDate(extract.created_at),
                exired: extract.expired,
                withdrawal: extract.withdrawal,
            };
        });
        return data;
    }
    formatExpireDate(created_at) {
        const date = new Date(new Date(created_at).setDate(new Date().getDate() + 90));
        return date_utils_1.formatDate(date);
    }
};
TransactionService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('USER_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map