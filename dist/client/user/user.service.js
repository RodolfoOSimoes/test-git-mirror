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
const quest_entity_1 = require("../../entities/quest.entity");
const user_entity_1 = require("../../entities/user.entity");
const setting_entity_1 = require("../../entities/setting.entity");
const extract_entity_1 = require("../../entities/extract.entity");
const authentication_service_1 = require("../../utils/authentication/authentication.service");
const storage_service_1 = require("../../utils/storage/storage.service");
const typeorm_1 = require("typeorm");
const statement_entity_1 = require("../../entities/statement.entity");
const order_entity_1 = require("../../entities/order.entity");
const accomplished_quest_entity_1 = require("../../entities/accomplished-quest.entity");
const code_utils_1 = require("../../utils/code.utils");
const city_entity_1 = require("../../entities/city.entity");
let UserService = class UserService {
    constructor(userRepository, questRepository, settingRepository, orderRepository, statmentsRepository, accomplishedRepository, extractRepository, cityRepository, authenticationTokenService, storageService) {
        this.userRepository = userRepository;
        this.questRepository = questRepository;
        this.settingRepository = settingRepository;
        this.orderRepository = orderRepository;
        this.statmentsRepository = statmentsRepository;
        this.accomplishedRepository = accomplishedRepository;
        this.extractRepository = extractRepository;
        this.cityRepository = cityRepository;
        this.authenticationTokenService = authenticationTokenService;
        this.storageService = storageService;
    }
    async create(requestInfo, data) {
        const user = await this.userRepository.findOne({
            uid: data['id'],
        });
        if (user) {
            await this.authenticationTokenService.create(requestInfo, user);
            return {
                id: user.id,
                email: user.email,
            };
        }
        if (!user) {
            const newUser = new user_entity_1.User();
            newUser.name = data['display_name'];
            newUser.email = data['email'];
            newUser.uid = data['id'];
            newUser.provider = 'spotify';
            newUser.credentials = data['credentials'];
            newUser.login_count = 1;
            newUser.last_time_verified = new Date().getTime();
            newUser.created_at = new Date();
            newUser.updated_at = new Date();
            newUser.have_accepted = false;
            newUser.opt_in_mailing = false;
            newUser.profile_completed = false;
            newUser.situation = false;
            newUser.situation = false;
            newUser.invitation_code = code_utils_1.generateCode();
            newUser.balance = 0;
            newUser.product = data['product'];
            const savedUser = await this.userRepository.save(newUser);
            await this.authenticationTokenService.create(requestInfo, savedUser);
            await this.storageService.saveProfilePic(data['images'][0]['url'], savedUser.id);
            return {
                id: savedUser.id,
                email: newUser.email,
            };
        }
    }
    async findOne(id) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const user = await this.userRepository.findOne(id, {
            relations: ['city', 'city.state', 'addresses', 'invitations'],
        });
        if (user.deleted) {
            return new common_1.UnauthorizedException({ message: 'Usuário bloqueado' });
        }
        user.orders = await this.orderRepository.find({
            where: { user: user },
        });
        user.statements = await this.statmentsRepository.find({
            where: { user: user, kind: 1 },
        });
        user.accomplished_quests = await this.accomplishedRepository.find({
            where: { user: user },
            relations: ['quest'],
        });
        user.extracts = await this.extractRepository.find({
            where: { user: user },
        });
        const setting = await this.settingRepository.findOne();
        const quests = await this.questRepository.find({
            where: { date_start: typeorm_1.LessThan(new Date()), status: true, deleted: false },
        });
        const completed = quests.filter((quest) => user.accomplished_quests.find((q) => q.quest.id == quest.id));
        const image = await this.storageService.getPicture('User', user.id);
        const data = {
            id: user.id,
            type: 'users',
            situation: 'active',
            profile_completed: user.profile_completed,
            phone: user.phone,
            name: user.name,
            image: image,
            have_accepted: user.have_accepted,
            email: user.email,
            daily_order: this.hasDailyOrder(user.orders),
            birthdate: user.birthdate,
            address: { completed: ((_b = (_a = user.addresses) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.completed) || false },
            accounts: ['spotify'],
            city: {
                id: (_c = user.city) === null || _c === void 0 ? void 0 : _c.id,
                name: (_d = user.city) === null || _d === void 0 ? void 0 : _d.name,
                state: {
                    id: (_f = (_e = user.city) === null || _e === void 0 ? void 0 : _e.state) === null || _f === void 0 ? void 0 : _f.id,
                    name: (_h = (_g = user.city) === null || _g === void 0 ? void 0 : _g.state) === null || _h === void 0 ? void 0 : _h.name,
                    acronym: (_k = (_j = user.city) === null || _j === void 0 ? void 0 : _j.state) === null || _k === void 0 ? void 0 : _k.acronym,
                },
            },
            invitation: {
                code: user.invitation_code,
                guests: user.invitations.length,
                of: setting.invitation_quantity - user.invitations.length,
            },
            quests: {
                completed: (completed === null || completed === void 0 ? void 0 : completed.length) || 0,
                incompleted: quests.length - ((completed === null || completed === void 0 ? void 0 : completed.length) || 0),
            },
            score: {
                general_balance: this.getGeneralBalance(user.statements, user.extracts) || 0,
                expired_today: this.getExpiredToday(user.extracts) || 0,
            },
        };
        return data;
    }
    async update(id, dto) {
        const city = await this.cityRepository.findOne(dto.user.city_id);
        if (dto.user.image && dto.user.image.data) {
            await this.storageService.updatePic(dto.user.image.data, id, 'User');
        }
        console.log(dto.user.birthdate);
        await this.userRepository.update(id, {
            city: city,
            birthdate: this.getBirthDate(dto.user.birthdate),
            email: dto.user.email,
            phone: dto.user.phone,
            name: dto.user.name,
        });
        return { message: 'Perfil atualizado com sucesso!' };
    }
    async updateTerms(id, dto) {
        this.userRepository.update(id, {
            opt_in_mailing: dto.user.opt_in_mailing,
            have_accepted: true,
        });
        return { message: 'Usuário atualizado com sucesso' };
    }
    async remove(id) {
        await this.userRepository.update(id, {
            deleted: true,
        });
        return { message: 'Usuário deletado com sucesso' };
    }
    getExpiredToday(extracts) {
        return extracts.reduce((current, total) => {
            if (this.compareDate(total.date_day)) {
                return current + Number(total.expired);
            }
        }, 0);
    }
    compareDate(date) {
        const date1 = new Date(date).toISOString().split('T')[0];
        const date2 = new Date().toISOString().split('T')[0];
        const [year, month, day] = date1.split('-');
        const [year2, month2, day2] = date2.split('-');
        return year == year2 && month == month2 && day == day2;
    }
    getGeneralBalance(statements, extracts) {
        const amount = statements.reduce((current, total) => current + Number(total.amount), 0);
        const withdrawals = extracts.reduce((current, total) => current + Number(total.withdrawal), 0);
        const expired = extracts.reduce((current, total) => current + Number(total.expired), 0);
        return amount - withdrawals - expired;
    }
    hasDailyOrder(orders) {
        const order = orders.find((order) => this.compareDate(order.created_at));
        return order ? true : false;
    }
    getBirthDate(birthDate) {
        const [day, month, year] = birthDate.split('/');
        return new Date(Number(year), Number(month) - 1, Number(day));
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('USER_REPOSITORY')),
    __param(1, common_1.Inject('QUEST_REPOSITORY')),
    __param(2, common_1.Inject('SETTINGS_REPOSITORY')),
    __param(3, common_1.Inject('ORDER_REPOSITORY')),
    __param(4, common_1.Inject('STATEMENT_REPOSITORY')),
    __param(5, common_1.Inject('ACCOMPLISHED_QUEST_REPOSITORY')),
    __param(6, common_1.Inject('EXTRACT_REPOSITORY')),
    __param(7, common_1.Inject('CITY_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        authentication_service_1.AuthenticationService,
        storage_service_1.StorageService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map