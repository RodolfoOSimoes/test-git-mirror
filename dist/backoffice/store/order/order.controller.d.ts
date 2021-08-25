import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    findAll(req: any, page: number): Promise<import("../../../entities/order.entity").Order[]>;
    findOne(req: any, id: number): Promise<import("../../../entities/order.entity").Order>;
    update(req: any, id: number, updateOrderDto: UpdateOrderDto): Promise<{
        message: string;
    }>;
    cancel(req: any, id: number): Promise<{
        message: string;
    }>;
    validate_coupon(req: any, id: number): Promise<{
        message: string;
    }>;
}
