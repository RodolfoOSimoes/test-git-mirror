import { PaginationService } from 'src/utils/pagination/pagination.service';
import { Repository } from 'typeorm';
import { AdminService } from '../admin/admin.service';
import { CreateBadgeChallengeDto } from './dto/create-badge-challenge.dto';
import { UpdateBadgeChallengeDto } from './dto/update-badge-challenge.dto';
import { BadgeChallenge } from '../../entities/badge-challenge.entity';
export declare class BadgeChallengeService {
    private badgeChallengeRepository;
    private adminService;
    private paginationService;
    constructor(badgeChallengeRepository: Repository<BadgeChallenge>, adminService: AdminService, paginationService: PaginationService);
    create(admin_id: number, dto: CreateBadgeChallengeDto): Promise<{
        message: string;
    }>;
    findAll(page?: number): Promise<{
        data: {
            id: number;
            name: string;
            total_times_of_streamings: number;
            status: boolean;
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
    findOne(id: number): Promise<BadgeChallenge>;
    update(admin_id: number, id: number, dto: UpdateBadgeChallengeDto): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    badgeChallengeMapper(badgeChallenger: BadgeChallenge): {
        id: number;
        name: string;
        total_times_of_streamings: number;
        status: boolean;
    };
}
