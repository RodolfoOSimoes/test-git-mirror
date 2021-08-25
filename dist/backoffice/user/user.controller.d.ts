import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(req: any, page: number, size: number, query: string): Promise<{
        data: import("../../entities/user.entity").User[];
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
    findOne(req: any, id: number): Promise<import("../../entities/user.entity").User>;
}
