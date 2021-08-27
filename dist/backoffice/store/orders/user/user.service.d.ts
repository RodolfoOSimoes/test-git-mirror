import { User } from '../../../../entities/user.entity';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { Repository } from 'typeorm';
import { Order } from '../../../../entities/order.entity';
export declare class UserService {
    private orderRepository;
    private userRepository;
    private paginationService;
    constructor(orderRepository: Repository<Order>, userRepository: Repository<User>, paginationService: PaginationService);
    findAll(page?: number): Promise<{
        data: {
            id: number;
            type: string;
            created_at: Date;
            price_of_product: number;
            sent: boolean;
            tracking_code: string;
            relationships: {
                address: {
                    id: number;
                    type: string;
                };
                product: {
                    id: number;
                    type: string;
                };
                user: {
                    id: number;
                    type: string;
                };
            };
        }[];
        included: {
            id: any;
            type: string;
            email: any;
            name: any;
        }[];
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
    findOne(id: number): Promise<Order[]>;
}
