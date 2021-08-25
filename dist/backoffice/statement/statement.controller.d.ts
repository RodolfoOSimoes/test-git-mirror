import { StatementService } from './statement.service';
export declare class StatementController {
    private readonly statementService;
    constructor(statementService: StatementService);
    findAll(req: any, page: number): Promise<import("../../entities/statement.entity").Statement[]>;
    findOne(req: any, id: number): Promise<import("../../entities/statement.entity").Statement>;
}
