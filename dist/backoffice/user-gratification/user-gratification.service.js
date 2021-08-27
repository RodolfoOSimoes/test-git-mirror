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
exports.UserGratificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const admin_service_1 = require("../admin/admin.service");
const user_service_1 = require("../user/user.service");
const user_gratification_entity_1 = require("../../entities/user-gratification.entity");
let UserGratificationService = class UserGratificationService {
    constructor(userGratificationRepository, adminService, userService) {
        this.userGratificationRepository = userGratificationRepository;
        this.adminService = adminService;
        this.userService = userService;
    }
    async create(admin_id, data) {
        const userGratification = new user_gratification_entity_1.UserGratification();
        userGratification.admin = await this.adminService.findById(admin_id);
        userGratification.user = await this.userService.findById(data.gratification.user_id);
        userGratification.kind = data.gratification.kind;
        userGratification.score = data.gratification.score;
        userGratification.is_cashback = data.gratification.is_cashback;
        await this.userGratificationRepository.save(userGratification);
        return { message: 'Gratificação criada com sucesso.' };
    }
    async findAll(page) {
        const limit = 10;
        return await this.userGratificationRepository.find({
            skip: page * limit,
            take: limit,
            relations: ['admin', 'user'],
        });
    }
    async remove(id) {
        return `This action removes a #${id} userGratification`;
    }
};
UserGratificationService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('USER_GRATIFICATION_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        admin_service_1.AdminService,
        user_service_1.UserService])
], UserGratificationService);
exports.UserGratificationService = UserGratificationService;
//# sourceMappingURL=user-gratification.service.js.map