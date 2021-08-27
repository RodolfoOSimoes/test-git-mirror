import { PaginationService } from 'src/utils/pagination/pagination.service';
import { Repository } from 'typeorm';
import { AdminService } from '../admin/admin.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Campaign } from '../../entities/campaign.entity';
import { StorageService } from 'src/utils/storage/storage.service';
export declare class CampaignService {
    private campaignRepository;
    private adminService;
    private paginationService;
    private storageService;
    constructor(campaignRepository: Repository<Campaign>, adminService: AdminService, paginationService: PaginationService, storageService: StorageService);
    create(admin_id: number, data: CreateCampaignDto): Promise<{
        message: string;
    }>;
    findAll(page?: number): Promise<{
        data: Campaign[];
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
    findOne(id: number): Promise<Campaign>;
    update(admin_id: number, id: number, data: UpdateCampaignDto): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
