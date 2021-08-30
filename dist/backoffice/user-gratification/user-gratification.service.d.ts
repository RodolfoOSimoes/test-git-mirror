import { Repository } from 'typeorm';
import { AdminService } from '../admin/admin.service';
import { UserService } from '../user/user.service';
import { CreateUserGratificationDto } from './dto/create-user-gratification.dto';
import { UserGratification } from '../../entities/user-gratification.entity';
import { Statement } from 'src/entities/statement.entity';
import { Campaign } from 'src/entities/campaign.entity';
export declare class UserGratificationService {
    private userGratificationRepository;
    private statementRepository;
    private campaignRepository;
    private adminService;
    private userService;
    constructor(userGratificationRepository: Repository<UserGratification>, statementRepository: Repository<Statement>, campaignRepository: Repository<Campaign>, adminService: AdminService, userService: UserService);
    create(admin_id: number, data: CreateUserGratificationDto): Promise<{
        message: string;
    }>;
    delete(id: number): Promise<void>;
}
