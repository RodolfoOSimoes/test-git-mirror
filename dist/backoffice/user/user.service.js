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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const pagination_service_1 = require("../../utils/pagination/pagination.service");
const typeorm_1 = require("typeorm");
let UserService = class UserService {
    constructor(userRepository, paginationService) {
        this.userRepository = userRepository;
        this.paginationService = paginationService;
    }
    async findAll(page = 1, size = 10, query) {
        const [data, count] = await this.userRepository.findAndCount({
            skip: (page - 1) * size,
            take: size,
            relations: ['city'],
            order: { id: 'DESC' },
            where: query
                ? [{ name: typeorm_1.ILike(`%${query}%`) }, { email: typeorm_1.ILike(`%${query}%`) }]
                : {},
        });
        return {
            data,
            currentPage: page,
            size: Math.ceil(count / size),
            links: this.paginationService.pagination('v1/backoffice/users', page, size, count),
        };
    }
    async findOne(id) {
        const data = await this.userRepository.findOne(id, {
            relations: ['city', 'city.state', 'city.state.region'],
        });
        return data;
    }
    async findById(id) {
        return await this.userRepository.findOne(id);
    }
    userMapper(user) {
        var _a;
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            city: ((_a = user.city) === null || _a === void 0 ? void 0 : _a.name) || undefined,
            balance: user.balance,
            opt_in_mailing: user.opt_in_mailing,
            have_accepted: user.have_accepted,
            situation: user.situation,
        };
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('USER_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        pagination_service_1.PaginationService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map