import { BadgeChallenge } from 'src/entities/badge-challenge.entity';
import { Repository } from 'typeorm';
export declare class BadgeChallengeService {
    private badgeChallengeRepository;
    constructor(badgeChallengeRepository: Repository<BadgeChallenge>);
    findAll(): Promise<BadgeChallenge[]>;
    findOne(id: number): Promise<BadgeChallenge>;
}
