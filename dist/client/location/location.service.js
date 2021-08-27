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
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const city_entity_1 = require("../../entities/city.entity");
const state_entity_1 = require("../../entities/state.entity");
const typeorm_1 = require("typeorm");
let LocationService = class LocationService {
    constructor(cityRepository, stateRepository) {
        this.cityRepository = cityRepository;
        this.stateRepository = stateRepository;
    }
    async findStates() {
        return await this.stateRepository.find({ order: { name: 'ASC' } });
    }
    async findCities(state_id) {
        const state = await this.stateRepository.findOne(state_id);
        return await this.cityRepository.find({
            where: { state: state },
            order: { name: 'ASC' },
        });
    }
};
LocationService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('CITY_REPOSITORY')),
    __param(1, common_1.Inject('STATE_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], LocationService);
exports.LocationService = LocationService;
//# sourceMappingURL=location.service.js.map