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
exports.ExtractJob = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const user_entity_1 = require("../entities/user.entity");
const extract_entity_1 = require("../entities/extract.entity");
const typeorm_1 = require("typeorm");
const statement_entity_1 = require("../entities/statement.entity");
const withdrawals_entity_1 = require("../entities/withdrawals.entity");
let ExtractJob = class ExtractJob {
    constructor(userRepository, extractRepository, statementRepository, withdrawRepository) {
        this.userRepository = userRepository;
        this.extractRepository = extractRepository;
        this.statementRepository = statementRepository;
        this.withdrawRepository = withdrawRepository;
    }
    async handleCron() {
        const yerterday = this.getYesterday();
        const users = await this.loadUsers();
        users.forEach(async (user) => {
            const extract = await this.extractRepository.findOne({
                order: { created_at: 'DESC' },
                select: ['created_at'],
            });
            if (!this.compareDate(extract.created_at)) {
                const depositsStatements = await this.statementRepository.find({
                    where: {
                        user: user,
                        created_at: typeorm_1.Between(yerterday.start, yerterday.end),
                    },
                });
                const expiredStatements = await this.statementRepository.find({
                    where: {
                        user: user,
                        expiration_date: yerterday.expiration,
                        kind: 1,
                    },
                });
                const expired = expiredStatements.reduce((acc, statement) => acc + Number(statement.amount), 0) || 0;
                const deposited = depositsStatements.reduce((acc, statement) => {
                    if (statement.kind == 1)
                        return acc + Number(statement.amount);
                }, 0) || 0;
                const withdraw = depositsStatements.reduce((acc, statement) => {
                    if (statement.kind == 0)
                        return acc + Number(statement.amount);
                }, 0) || 0;
                await this.extractRepository.save({
                    created_at: new Date(),
                    updated_at: new Date(),
                    user: user,
                    date_day: yerterday.expiration,
                    deposit: deposited,
                    expired: expired,
                    withdrawals: withdraw,
                });
            }
        });
    }
    getYesterday() {
        const date = new Date();
        const month = date.getMonth() + 1;
        const day = date.getDate() - 1;
        const year = date.getFullYear();
        const formatedData = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        return {
            start: `${formatedData} 00:00:00`,
            end: `${formatedData} 23:59:59`,
            expiration: formatedData,
        };
    }
    compareDate(date) {
        const date1 = new Date(date);
        const date2 = new Date();
        return (date1.getFullYear() == date2.getFullYear() &&
            date1.getMonth() == date2.getMonth() &&
            date1.getDate() == date2.getDate());
    }
    async loadUsers() {
        return await this.userRepository.find({
            where: {
                deleted: false,
                situation: false,
                have_accepted: true,
            },
            select: ['id'],
        });
    }
};
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExtractJob.prototype, "handleCron", null);
ExtractJob = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('USER_REPOSITORY')),
    __param(1, common_1.Inject('EXTRACT_REPOSITORY')),
    __param(2, common_1.Inject('STATEMENT_REPOSITORY')),
    __param(3, common_1.Inject('WITHDRAWAL_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], ExtractJob);
exports.ExtractJob = ExtractJob;
//# sourceMappingURL=ExtractJob.js.map