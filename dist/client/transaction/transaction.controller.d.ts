import { TransactionService } from './transaction.service';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    findAll(req: any): Promise<{
        id: number;
        type: string;
        created_at: string;
        deposit: number;
        expiration_date: string;
        exired: number;
        withdrawal: number;
    }[]>;
}
