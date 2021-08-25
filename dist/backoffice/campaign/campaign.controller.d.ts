import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
export declare class CampaignController {
    private readonly campaignService;
    constructor(campaignService: CampaignService);
    create(req: any, createCampaignDto: CreateCampaignDto): Promise<{
        message: string;
    }>;
    findAll(req: any, page: number): Promise<{
        data: import("../../entities/campaign.entity").Campaign[];
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
    findOne(req: any, id: number): Promise<import("../../entities/campaign.entity").Campaign>;
    update(req: any, id: number, updateCampaignDto: UpdateCampaignDto): Promise<{
        message: string;
    }>;
    remove(req: any, id: number): Promise<{
        message: string;
    }>;
}
