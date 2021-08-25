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
exports.CashBackService = void 0;
const common_1 = require("@nestjs/common");
const cash_backs_entity_1 = require("../../entities/cash-backs.entity");
const rescue_entity_1 = require("../../entities/rescue.entity");
const user_entity_1 = require("../../entities/user.entity");
const typeorm_1 = require("typeorm");
let CashBackService = class CashBackService {
    constructor(userRepository, cashBackRepository, rescueRepository) {
        this.userRepository = userRepository;
        this.cashBackRepository = cashBackRepository;
        this.rescueRepository = rescueRepository;
    }
    async findAll(userId) {
        const user = await this.userRepository.findOne(userId, {
            relations: ['cashbacks', 'cashbacks.rescue'],
        });
        const rescues = await this.rescueRepository.find({
            order: { priority: 'ASC', id: 'DESC' },
            where: { deleted: false, status: true },
        });
        const data = rescues.map((rescue) => {
            const { balance, limited } = this.getBalance(rescue, user.cashbacks);
            return {
                id: rescue.id,
                type: 'cash_backs',
                artists: rescue.artists,
                balance: balance,
                cover_url: rescue.cover_url,
                info_playlist: rescue.info_playlist,
                limit_streams: rescue.limit_streams,
                limited: limited,
                name: rescue.name,
                score: rescue.score,
                uid: rescue.uid,
                uri: rescue.uri,
                playlist: rescue.playlist,
            };
        });
        return data;
    }
    async findOne(id) {
        return this.cashBackRepository.findOne(id);
    }
    getBalance(rescue, cashbacks) {
        var _a;
        const cashbacksFiltered = cashbacks.filter((cashback) => cashback.rescue.id == rescue.id);
        return {
            balance: (cashbacksFiltered === null || cashbacksFiltered === void 0 ? void 0 : cashbacksFiltered.reduce((total, current) => {
                if (current.rescue.id == rescue.id) {
                    return total + rescue.score;
                }
            }, 0)) || 0,
            limited: ((_a = cashbacksFiltered === null || cashbacksFiltered === void 0 ? void 0 : cashbacksFiltered.filter((cashback) => this.compareDate(cashback.created_at))) === null || _a === void 0 ? void 0 : _a.length) || 0,
        };
    }
    compareDate(date) {
        const date1 = new Date(date);
        const date2 = new Date();
        return (date1.getFullYear() == date2.getFullYear() &&
            date1.getMonth() == date2.getMonth() &&
            date1.getDate() == date2.getDate());
    }
};
CashBackService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('USER_REPOSITORY')),
    __param(1, common_1.Inject('CASH_BACK_REPOSITORY')),
    __param(2, common_1.Inject('RESCUE_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], CashBackService);
exports.CashBackService = CashBackService;
//# sourceMappingURL=cash-back.service.js.map