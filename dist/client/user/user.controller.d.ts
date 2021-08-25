import { UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateTermsDto } from './dto/update-terms.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findOne(req: any): Promise<UnauthorizedException | {
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
    updateUser(req: any, updateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
    updateTerms(req: any, updateTerms: UpdateTermsDto): Promise<{
        message: string;
    }>;
    remove(req: any): Promise<{
        message: string;
    }>;
}
