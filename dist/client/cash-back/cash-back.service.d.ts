import { CashBack } from 'src/entities/cash-backs.entity';
import { Rescue } from 'src/entities/rescue.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
export declare class CashBackService {
    private userRepository;
    private cashBackRepository;
    private rescueRepository;
    constructor(userRepository: Repository<User>, cashBackRepository: Repository<CashBack>, rescueRepository: Repository<Rescue>);
    findAll(userId: number): Promise<{
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
    findOne(id: number): Promise<CashBack>;
    getBalance(rescue: Rescue, cashbacks: CashBack[]): {
        balance: number;
        limited: number;
    };
    compareDate(date: Date): boolean;
}
