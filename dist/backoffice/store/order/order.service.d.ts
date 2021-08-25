import { UserService } from 'src/backoffice/user/user.service';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from '../../../entities/order.entity';
export declare class OrderService {
    private orderRepository;
    private userService;
    private productService;
    constructor(orderRepository: Repository<Order>, userService: UserService, productService: ProductService);
    validate_coupon(coupon_id: number): Promise<{
        message: string;
    }>;
    findAll(page?: number): Promise<Order[]>;
    findOne(id: number): Promise<Order>;
    update(id: number, dto: UpdateOrderDto): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
