import { UserGratificationService } from './user-gratification.service';
import { CreateUserGratificationDto } from './dto/create-user-gratification.dto';
export declare class UserGratificationController {
    private readonly userGratificationService;
    constructor(userGratificationService: UserGratificationService);
    create(req: any, createUserGratificationDto: CreateUserGratificationDto): Promise<{
        message: string;
    }>;
    delete(req: any, id: number): Promise<void>;
}
