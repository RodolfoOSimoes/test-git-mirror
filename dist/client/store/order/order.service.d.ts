import { Order } from 'src/entities/order.entity';
import { User } from 'src/entities/user.entity';
import { StorageService } from 'src/utils/storage/storage.service';
import { Repository } from 'typeorm';
export declare class OrderService {
    private userRepository;
    private orderRepository;
    private storageService;
    constructor(userRepository: Repository<User>, orderRepository: Repository<Order>, storageService: StorageService);
    findKind(user_id: number, kind: string): Promise<{
        data: {
            id: number;
            type: string;
            code_secret: string;
            kind: string;
            created_at: Date;
            price_of_product: number;
            sent: boolean;
            tracking_code: string;
            relationships: {
                product: {
                    id: string;
                    type: string;
                };
            };
        }[];
        included: any[];
    } | {
        data?: undefined;
        included?: undefined;
    }>;
    findOne(id: number): Promise<Order>;
    findTracking(tracking: string): Promise<{
        eventos: any;
        message?: undefined;
    } | {
        message: string;
        eventos?: undefined;
    }>;
}
