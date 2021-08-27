import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from '../../entities/admin.entity';
import { MfaService } from 'src/utils/mfa/mfa.service';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { SendMailProducerService } from 'src/jobs/producers/sendMail-producer-service';
import { UpdateAdminProfileDto } from './dto/update-profile.dto';
export declare class AdminService {
    private adminRepository;
    private mfaService;
    private paginationService;
    private sendMailProducer;
    constructor(adminRepository: Repository<Admin>, mfaService: MfaService, paginationService: PaginationService, sendMailProducer: SendMailProducerService);
    create(createAdminDto: CreateAdminDto): Promise<{
        message: string;
    }>;
    findAll(page?: number): Promise<any>;
    me(email: string): Promise<any>;
    findOne(id: number): Promise<any>;
    forgetPassword(email: string): Promise<void>;
    update(id: number, createAdminDto: CreateAdminDto): Promise<{
        message: string;
    }>;
    updateByToken(email: string, createAdminDto: CreateAdminDto): Promise<{
        message: string;
    }>;
    remove(email: string): Promise<void>;
    findByEmail(email: string): Promise<Admin>;
    findByToken(token: string): Promise<Admin>;
    findById(id: number): Promise<Admin>;
    updateProfile(id: number, dto: UpdateAdminProfileDto): Promise<string>;
    adminMapper(admin: Admin): {
        id: number;
        email: string;
        status: boolean;
        roles: string;
        created_at: Date;
        updated_at: Date;
    };
    generatePassword(): string;
}
