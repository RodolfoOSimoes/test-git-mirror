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
exports.SettingService = void 0;
const common_1 = require("@nestjs/common");
const campaign_entity_1 = require("../../entities/campaign.entity");
const setting_entity_1 = require("../../entities/setting.entity");
const storage_service_1 = require("../../utils/storage/storage.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const date_utils_1 = require("../../utils/date.utils");
let SettingService = class SettingService {
    constructor(settingsRepository, campaignRepository, storageService) {
        this.settingsRepository = settingsRepository;
        this.campaignRepository = campaignRepository;
        this.storageService = storageService;
    }
    async findOne() {
        const setting = await this.settingsRepository.findOne();
        setting.uri_playlist = setting.uri_playlist.split(':')[2];
        const campaign = await this.campaignRepository.findOne({
            status: true,
            date_start: typeorm_1.LessThanOrEqual(date_utils_1.formatDate(new Date())),
            date_finish: typeorm_1.MoreThanOrEqual(date_utils_1.formatDate(new Date())),
        });
        if (campaign) {
            const image = await this.storageService.getPicture('Campaign', campaign.id);
            setting['campaign'] = {
                date_finish: campaign.date_finish,
                date_start: campaign.date_start,
                id: campaign.id,
                image: image,
                name: campaign.name,
                slug: campaign.slug,
                status: campaign.status,
            };
        }
        delete setting.created_at;
        delete setting.updated_at;
        return setting;
    }
};
SettingService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('SETTINGS_REPOSITORY')),
    __param(1, common_1.Inject('CAMPAIGN_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        storage_service_1.StorageService])
], SettingService);
exports.SettingService = SettingService;
//# sourceMappingURL=setting.service.js.map