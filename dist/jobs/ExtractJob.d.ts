import { User } from 'src/entities/user.entity';
import { Extract } from 'src/entities/extract.entity';
import { Repository } from 'typeorm';
import { Statement } from 'src/entities/statement.entity';
import { Withdrawal } from 'src/entities/withdrawals.entity';
export declare class ExtractJob {
    private userRepository;
    private extractRepository;
    private statementRepository;
    private withdrawRepository;
    constructor(userRepository: Repository<User>, extractRepository: Repository<Extract>, statementRepository: Repository<Statement>, withdrawRepository: Repository<Withdrawal>);
    handleCron(): Promise<void>;
    getYesterday(): {
        start: string;
        end: string;
        expiration: string;
    };
    compareDate(date: Date): boolean;
    loadUsers(): Promise<User[]>;
}
