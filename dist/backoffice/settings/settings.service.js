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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const admin_service_1 = require("../admin/admin.service");
let SettingsService = class SettingsService {
    constructor(settingsRepository, adminService) {
        this.settingsRepository = settingsRepository;
        this.adminService = adminService;
    }
    async findAll() {
        return await this.settingsRepository.findOne();
    }
    async update(id, data) {
        const setting = await this.settingsRepository.findOne();
        if (setting) {
            data.setting.admin = await this.adminService.findById(id);
            this.settingsRepository.update(setting.id, data.setting);
            return { message: 'Setting atualizada com sucesso!' };
        }
        return { message: 'Setting não encontrada!' };
    }
};
SettingsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('SETTINGS_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        admin_service_1.AdminService])
], SettingsService);
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map