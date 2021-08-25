import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
export declare class TransactionService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findAll(id: number): Promise<{
        id: number;
        type: string;
        created_at: string;
        deposit: number;
        expiration_date: string;
        exired: number;
        withdrawal: number;
    }[]>;
    formatExpireDate(created_at: Date): string;
}
