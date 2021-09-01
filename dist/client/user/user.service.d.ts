import { UnauthorizedException } from '@nestjs/common';
import { Quest } from 'src/entities/quest.entity';
import { User } from 'src/entities/user.entity';
import { Setting } from 'src/entities/setting.entity';
import { Extract } from 'src/entities/extract.entity';
import { AuthenticationService } from 'src/utils/authentication/authentication.service';
import { StorageService } from 'src/utils/storage/storage.service';
import { Repository } from 'typeorm';
import { UpdateTermsDto } from './dto/update-terms.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Statement } from 'src/entities/statement.entity';
import { Order } from 'src/entities/order.entity';
import { AccomplishedQuests } from 'src/entities/accomplished-quest.entity';
import { City } from 'src/entities/city.entity';
import { Invitation } from 'src/entities/invitations.entity';
import { Campaign } from 'src/entities/campaign.entity';
export declare class UserService {
    private userRepository;
    private questRepository;
    private settingRepository;
    private orderRepository;
    private statmentsRepository;
    private accomplishedRepository;
    private extractRepository;
    private cityRepository;
    private invitatonRepository;
    private campaignRepository;
    private authenticationTokenService;
    private storageService;
    constructor(userRepository: Repository<User>, questRepository: Repository<Quest>, settingRepository: Repository<Setting>, orderRepository: Repository<Order>, statmentsRepository: Repository<Statement>, accomplishedRepository: Repository<AccomplishedQuests>, extractRepository: Repository<Extract>, cityRepository: Repository<City>, invitatonRepository: Repository<Invitation>, campaignRepository: Repository<Campaign>, authenticationTokenService: AuthenticationService, storageService: StorageService);
    create(requestInfo: any, data: any): Promise<{
        id: number;
        email: string;
    }>;
    findOne(id: number): Promise<UnauthorizedException | {
        id: number;
        type: string;
        situation: string;
        profile_completed: boolean;
        phone: string;
        name: string;
        image: string;
        have_accepted: boolean;
        email: string;
        daily_order: boolean;
        birthdate: Date;
        address: {
            completed: boolean;
        };
        accounts: string[];
        city: {
            id: number;
            name: string;
            state: {
                id: number;
                name: string;
                acronym: string;
            };
        };
        invitation: {
            code: string;
            guests: number;
            of: number;
        };
        quests: {
            completed: number;
            incompleted: number;
        };
        score: {
            general_balance: number;
            expired_today: number;
        };
    }>;
    update(id: number, dto: UpdateUserDto): Promise<{
        message: string;
    }>;
    updateTerms(id: number, dto: UpdateTermsDto): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    getExpiredToday(extracts: Extract[]): number;
    compareDate(date: Date): boolean;
    getGeneralBalance(statements: Statement[], extracts: Extract[]): number;
    hasDailyOrder(orders: Order[]): boolean;
    getBirthDate(birthDate: string): Date;
}
