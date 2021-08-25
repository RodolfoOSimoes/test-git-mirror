import { BadgeChallengeService } from './badge-challenge.service';
import { CreateBadgeChallengeDto } from './dto/create-badge-challenge.dto';
import { UpdateBadgeChallengeDto } from './dto/update-badge-challenge.dto';
export declare class BadgeChallengeController {
    private readonly badgeChallengeService;
    constructor(badgeChallengeService: BadgeChallengeService);
    create(req: any, createBadgeChallengeDto: CreateBadgeChallengeDto): Promise<{
        message: string;
    }>;
    findAll(req: any, page: number): Promise<{
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
    findOne(req: any, id: number): Promise<import("../../entities/badge-challenge.entity").BadgeChallenge>;
    update(req: any, id: number, updateBadgeChallengeDto: UpdateBadgeChallengeDto): Promise<{
        message: string;
    }>;
    remove(req: any, id: number): Promise<{
        message: string;
    }>;
}
