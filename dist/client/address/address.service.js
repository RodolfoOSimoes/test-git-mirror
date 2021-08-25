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
const user_entity_1 = require("../../entities/user.entity");
const address_entity_1 = require("../../entities/address.entity");
const typeorm_1 = require("typeorm");
const city_entity_1 = require("../../entities/city.entity");
let AddressService = class AddressService {
    constructor(userRepository, addressRepository, cityRepository) {
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
        this.cityRepository = cityRepository;
    }
    async create(id, dto) {
        const city = await this.cityRepository.findOne(dto.address.city_id);
        const user = await this.userRepository.findOne(id);
        delete dto.address.city_id;
        await this.addressRepository.save(Object.assign(Object.assign({}, dto.address), { city: city, user: user, created_at: new Date(), updated_at: new Date() }));
        return { message: 'Endereço salvo com sucesso.' };
    }
    async findOne(id) {
        var _a, _b, _c, _d, _e, _f;
        const user = await this.userRepository.findOne(id);
        const address = await this.addressRepository.findOne({
            where: { user: user },
            order: { id: 'DESC' },
            relations: ['city', 'city.state'],
        });
        const data = {
            id: address.id,
            cep: address.cep,
            city: {
                id: (_a = address.city) === null || _a === void 0 ? void 0 : _a.id,
                name: (_b = address.city) === null || _b === void 0 ? void 0 : _b.name,
                state: {
                    id: (_d = (_c = address.city) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.id,
                    acronym: (_f = (_e = address.city) === null || _e === void 0 ? void 0 : _e.state) === null || _f === void 0 ? void 0 : _f.acronym,
                },
            },
            complement: address.complement,
            cpf: address.cpf,
            created_at: address.created_at,
            full_address: address.full_address,
            neighborhood: address.neighborhood,
            number: address.number,
            recipient: address.recipient,
            reference: address.reference,
            street: address.street,
            updated_at: address.updated_at,
        };
        return data;
    }
    async update(id, dto) {
        const city = await this.cityRepository.findOne(dto.address.city_id);
        const user = await this.userRepository.findOne(id);
        delete dto.address.city_id;
        await this.addressRepository.save(Object.assign(Object.assign({}, dto.address), { completed: true, city: city, user: user, updated_at: new Date(), created_at: new Date() }));
        return { message: 'Endereço atualizado com sucesso.' };
    }
};
AddressService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('USER_REPOSITORY')),
    __param(1, common_1.Inject('ADDRESS_REPOSITORY')),
    __param(2, common_1.Inject('CITY_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], AddressService);
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map