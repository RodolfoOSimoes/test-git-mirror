import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
export declare class BadgeService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findOne(id: number): Promise<User>;
}
