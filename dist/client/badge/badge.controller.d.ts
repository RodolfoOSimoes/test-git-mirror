import { BadgeService } from './badge.service';
export declare class BadgeController {
    private readonly badgeService;
    constructor(badgeService: BadgeService);
    findOne(req: any): Promise<import("../../entities/user.entity").User>;
}
