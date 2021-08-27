import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    findKind(req: any, kind: string): Promise<{
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
    findOne(req: any, id: number): Promise<import("../../../entities/order.entity").Order>;
    findTracking(req: any, tracking_id: string): Promise<{
        eventos: any;
        message?: undefined;
    } | {
        message: string;
        eventos?: undefined;
    }>;
}
