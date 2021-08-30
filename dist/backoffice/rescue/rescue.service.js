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
exports.RescueService = void 0;
const common_1 = require("@nestjs/common");
const pagination_service_1 = require("../../utils/pagination/pagination.service");
const typeorm_1 = require("typeorm");
const admin_service_1 = require("../admin/admin.service");
const spotify_service_1 = require("../../apis/spotify/spotify.service");
let RescueService = class RescueService {
    constructor(rescueRepository, adminService, paginationService, spotifyService) {
        this.rescueRepository = rescueRepository;
        this.adminService = adminService;
        this.paginationService = paginationService;
        this.spotifyService = spotifyService;
    }
    async create(admin_id, dto) {
        var _a, _b, _c;
        const admin = await this.adminService.findById(admin_id);
        const trackId = dto.rescue.uri.split(':')[2];
        const track = await this.spotifyService.getTrackInfo(trackId);
        const playlist = dto.rescue.playlist
            ? await this.spotifyService.getPlaylistNameAndDescription(dto.rescue.playlist.split(':')[2])
            : undefined;
        await this.rescueRepository.save({
            admin: admin,
            uri: dto.rescue.uri,
            uid: trackId,
            name: track.name,
            artists: (_b = (_a = track.album) === null || _a === void 0 ? void 0 : _a.artists) === null || _b === void 0 ? void 0 : _b.map((artist) => artist.name).join(', '),
            cover_url: (_c = track === null || track === void 0 ? void 0 : track.album.images.find((image) => (image === null || image === void 0 ? void 0 : image.height) == 640)) === null || _c === void 0 ? void 0 : _c.url,
            score: dto.rescue.score,
            status: dto.rescue.status,
            isrc: track.external_ids.isrc,
            deleted: false,
            created_at: new Date(),
            updated_at: new Date(),
            rescues_count: 0,
            playlist: dto.rescue.playlist,
            info_playlist: playlist,
            limited: dto.rescue.limited,
            limit_streams: dto.rescue.limit_streams,
            priority: dto.rescue.priority,
        });
        return { message: 'Hit criada com sucesso.' };
    }
    async findAll(page = 1) {
        var _a, _b;
        const limit = 10;
        const count = await this.rescueRepository.count({
            where: { deleted: false },
            order: { priority: 'ASC', id: 'DESC' },
        });
        const data = (_b = (_a = (await this.rescueRepository.find({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                id: 'DESC',
            },
        }))) === null || _a === void 0 ? void 0 : _a.sort((a, b) => {
            if (a.priority == b.priority)
                return b.id - a.id;
            else
                return a.priority - b.priority;
        })) === null || _b === void 0 ? void 0 : _b.map((rescue) => this.rescueMapper(rescue));
        return {
            data,
            currentPage: page,
            size: Math.ceil(count / limit),
            links: this.paginationService.pagination('v1/backoffice/rescues', page, limit, count),
        };
    }
    async findOne(id) {
        return await this.rescueRepository.findOne(id);
    }
    async update(admin_id, id, dto) {
        const admin = await this.adminService.findById(admin_id);
        await this.rescueRepository.update(id, {
            admin: admin,
            uri: dto.rescue.uri,
            status: dto.rescue.status,
            limit_streams: dto.rescue.limit_streams,
            limited: dto.rescue.limited,
            priority: dto.rescue.priority,
        });
        return { message: 'Hit atualizada com sucesso.' };
    }
    async remove(id) {
        await this.rescueRepository.update(id, {
            deleted: true,
        });
        return { message: 'Hit deletada com sucesso.' };
    }
    rescueMapper(rescue) {
        return {
            id: rescue.id,
            score: rescue.score,
            track_name: rescue.name,
            artists: rescue.artists,
            rescues_count: rescue.rescues_count,
            limit_streams: rescue.limit_streams,
            info_playlist: rescue.info_playlist,
            priority: rescue.priority,
        };
    }
};
RescueService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('RESCUE_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        admin_service_1.AdminService,
        pagination_service_1.PaginationService,
        spotify_service_1.SpotifyService])
], RescueService);
exports.RescueService = RescueService;
//# sourceMappingURL=rescue.service.js.map