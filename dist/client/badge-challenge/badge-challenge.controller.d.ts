import { BadgeChallengeService } from './badge-challenge.service';
export declare class BadgeChallengeController {
    private readonly badgeChallengeService;
    constructor(badgeChallengeService: BadgeChallengeService);
    findAll(req: any): Promise<import("../../entities/badge-challenge.entity").BadgeChallenge[]>;
    findOne(req: any, id: number): Promise<import("../../entities/badge-challenge.entity").BadgeChallenge>;
}
