import { CashBackService } from './cash-back.service';
export declare class CashBackController {
    private readonly cashBackService;
    constructor(cashBackService: CashBackService);
    findAll(req: any): Promise<{
        id: number;
        type: string;
        artists: string;
        balance: number;
        cover_url: string;
        info_playlist: string;
        limit_streams: number;
        limited: number;
        name: string;
        score: number;
        uid: string;
        uri: string;
        playlist: string;
    }[]>;
    findOne(req: any, id: number): Promise<import("../../entities/cash-backs.entity").CashBack>;
}
