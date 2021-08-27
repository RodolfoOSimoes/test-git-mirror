import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(req: any, page: number): Promise<{
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
    findOne(req: any, id: number): Promise<import("../../../../entities/order.entity").Order[]>;
}
