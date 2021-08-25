import { Repository } from 'typeorm';
import { Statement } from '../../entities/statement.entity';
export declare class StatementService {
    private statementRepository;
    constructor(statementRepository: Repository<Statement>);
    findAll(page?: number): Promise<Statement[]>;
    findOne(id: number): Promise<Statement>;
}
