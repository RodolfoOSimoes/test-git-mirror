import { RescueService } from './rescue.service';
import { CreateRescueDto } from './dto/create-rescue.dto';
import { UpdateRescueDto } from './dto/update-rescue.dto';
export declare class RescueController {
    private readonly rescueService;
    constructor(rescueService: RescueService);
    create(req: any, createRescueDto: CreateRescueDto): Promise<{
        message: string;
    }>;
    findAll(req: any, page: number): Promise<{
        data: {
            id: number;
            score: number;
            track_name: string;
            artists: string;
            rescues_count: number;
            limit_streams: number;
            info_playlist: string;
            priority: number;
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
    findOne(req: any, id: number): Promise<import("../../entities/rescue.entity").Rescue>;
    update(req: any, id: number, updateRescueDto: UpdateRescueDto): Promise<{
        message: string;
    }>;
    remove(req: any, id: number): Promise<{
        message: string;
    }>;
}
