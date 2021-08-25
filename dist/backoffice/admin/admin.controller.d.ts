import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminProfileDto } from './dto/update-profile.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    create(req: any, createAdminDto: CreateAdminDto): Promise<{
        message: string;
    }>;
    findAll(req: any, page: number): Promise<any>;
    me(req: any): Promise<any>;
    findOne(req: any, id: number): Promise<any>;
    forgetPassword(req: any, createAdminDto: CreateAdminDto): Promise<void>;
    update(req: any, id: number, createAdminDto: CreateAdminDto): Promise<{
        message: string;
    }>;
    updateByToken(req: any, createAdminDto: CreateAdminDto): Promise<{
        message: string;
    }>;
    remove(req: any): Promise<void>;
    updatePassword(req: any, dto: UpdateAdminProfileDto): Promise<string>;
}
