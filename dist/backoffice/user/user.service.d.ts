import { PaginationService } from 'src/utils/pagination/pagination.service';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
export declare class UserService {
    private userRepository;
    private paginationService;
    constructor(userRepository: Repository<User>, paginationService: PaginationService);
    findAll(page: number, size: number, query: string): Promise<{
        data: User[];
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
    findOne(id: number): Promise<User>;
    findById(id: number): Promise<User>;
    userMapper(user: User): {
        id: number;
        email: string;
        name: string;
        city: string;
        balance: number;
        opt_in_mailing: boolean;
        have_accepted: boolean;
        situation: boolean;
    };
}
