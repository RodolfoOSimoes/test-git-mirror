import { PaginationService } from 'src/utils/pagination/pagination.service';
import { Repository } from 'typeorm';
import { AdminService } from '../admin/admin.service';
import { CreateRescueDto } from './dto/create-rescue.dto';
import { UpdateRescueDto } from './dto/update-rescue.dto';
import { Rescue } from '../../entities/rescue.entity';
import { SpotifyService } from 'src/apis/spotify/spotify.service';
export declare class RescueService {
    private rescueRepository;
    private adminService;
    private paginationService;
    private spotifyService;
    constructor(rescueRepository: Repository<Rescue>, adminService: AdminService, paginationService: PaginationService, spotifyService: SpotifyService);
    create(admin_id: number, dto: CreateRescueDto): Promise<{
        message: string;
    }>;
    findAll(page?: number): Promise<{
        data: {
            id: number;
            score: number;
            track_name: string;
            artists: string;
            rescues_count: number;
            limit_streams: number;
            info_playlist: string;
            priority: number;
        }[];
        currentPage: number;
        size: number;
        links: {
            self: string;
            first: string;
            prev: string;
            next: string;
            last: string;
        };
    }>;
    findOne(id: number): Promise<Rescue>;
    update(admin_id: number, id: number, dto: UpdateRescueDto): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    rescueMapper(rescue: Rescue): {
        id: number;
        score: number;
        track_name: string;
        artists: string;
        rescues_count: number;
        limit_streams: number;
        info_playlist: string;
        priority: number;
    };
}
