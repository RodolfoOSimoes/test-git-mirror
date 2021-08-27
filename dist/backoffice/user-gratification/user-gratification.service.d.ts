import { Repository } from 'typeorm';
import { AdminService } from '../admin/admin.service';
import { UserService } from '../user/user.service';
import { CreateUserGratificationDto } from './dto/create-user-gratification.dto';
import { UserGratification } from '../../entities/user-gratification.entity';
export declare class UserGratificationService {
    private userGratificationRepository;
    private adminService;
    private userService;
    constructor(userGratificationRepository: Repository<UserGratification>, adminService: AdminService, userService: UserService);
    create(admin_id: number, data: CreateUserGratificationDto): Promise<{
        message: string;
    }>;
    findAll(page: number): Promise<UserGratification[]>;
    remove(id: number): Promise<string>;
}
