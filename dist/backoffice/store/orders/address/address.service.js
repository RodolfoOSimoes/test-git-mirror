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
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../../user/user.service");
const typeorm_1 = require("typeorm");
let AddressService = class AddressService {
    constructor(cityRepository, addressRepository, userService) {
        this.cityRepository = cityRepository;
        this.addressRepository = addressRepository;
        this.userService = userService;
    }
    async findOne(id) {
        const user = await this.userService.findOne(id);
        return await this.addressRepository.findOne({ where: { user: user } });
    }
    async update(id, dto) {
        const user = await this.userService.findOne(id);
        const city = await this.cityRepository.findOne(dto.address.city_id);
        const address = await this.addressRepository.findOne({
            where: { user: user },
        });
        delete dto.address.city_id;
        await this.addressRepository.update(address.id, Object.assign(Object.assign({}, dto.address), { city: city }));
        return { message: 'Endereço atualizado com sucesso.' };
    }
};
AddressService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('CITY_REPOSITORY')),
    __param(1, common_1.Inject('ADDRESS_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        user_service_1.UserService])
], AddressService);
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map