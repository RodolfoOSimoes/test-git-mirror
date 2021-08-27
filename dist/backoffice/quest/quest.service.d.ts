import { PaginationService } from 'src/utils/pagination/pagination.service';
import { Repository } from 'typeorm';
import { AdminService } from '../admin/admin.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { Quest } from '../../entities/quest.entity';
import { QuestOpts } from 'src/entities/quest-opts.entity';
import { QuestPreSaves } from 'src/entities/quest-pre-saves.entity';
export declare class QuestService {
    private questRepository;
    private questOptsRepository;
    private questPreSaveRepository;
    private adminService;
    private paginationService;
    constructor(questRepository: Repository<Quest>, questOptsRepository: Repository<QuestOpts>, questPreSaveRepository: Repository<QuestPreSaves>, adminService: AdminService, paginationService: PaginationService);
    create(admin_id: number, dto: CreateQuestDto): Promise<{
        message: string;
    }>;
    findAll(page?: number): Promise<{
        data: {
            id: number;
            date_start: Date;
            kind: string;
            status: boolean;
            accomplished_count: number;
            admin: {
                id: number;
                type: string;
            };
            quest_opt: QuestOpts;
            quest_youtube: {
                kind: string;
                id: number;
                url: string;
                quest: Quest;
                created_at: Date;
                updated_at: Date;
                name: string;
            };
            quest_question: import("../../entities/quest-questions.entity").QuestQuestions;
            quest_pre_save: QuestPreSaves;
            quest_spotify_playlist: import("../../entities/quest-spotify-playlists.entity").QuestSpotifyPlaylists;
            quest_spotify: import("../../entities/quest-spotifies.entity").QuestSpotifies;
        }[];
        currentPage: number;
        size: number;
        links: {
            self: string;
            first: string;
            prev: string;
            next: string;
            last: string;
        };
    }>;
    findOne(id: number): Promise<{
        id: number;
        accomplished_count: number;
        created_at: Date;
        date_start: Date;
        kind: string;
        score: number;
        status: boolean;
        updated_at: Date;
        admin: {
            id: number;
            type: string;
        };
        quest_opt: QuestOpts;
        quest_youtube: {
            kind: string;
            id: number;
            url: string;
            quest: Quest;
            created_at: Date;
            updated_at: Date;
            name: string;
        };
        quest_question: import("../../entities/quest-questions.entity").QuestQuestions;
        quest_pre_save: QuestPreSaves;
        quest_spotify_playlist: import("../../entities/quest-spotify-playlists.entity").QuestSpotifyPlaylists;
        quest_spotify: import("../../entities/quest-spotifies.entity").QuestSpotifies;
    }>;
    findListUsers(id: number, page?: number): Promise<{
        data: {
            id: number;
            type: string;
            name: string;
            email: string;
        }[];
        currentPage: number;
        size: number;
        links: {
            self: string;
            first: string;
            prev: string;
            next: string;
            last: string;
        };
    }>;
    update(admin_id: number, id: number, dto: UpdateQuestDto): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    questMapper(quest: Quest): {
        id: number;
        date_start: Date;
        kind: string;
        status: boolean;
        accomplished_count: number;
        admin: {
            id: number;
            type: string;
        };
        quest_opt: QuestOpts;
        quest_youtube: {
            kind: string;
            id: number;
            url: string;
            quest: Quest;
            created_at: Date;
            updated_at: Date;
            name: string;
        };
        quest_question: import("../../entities/quest-questions.entity").QuestQuestions;
        quest_pre_save: QuestPreSaves;
        quest_spotify_playlist: import("../../entities/quest-spotify-playlists.entity").QuestSpotifyPlaylists;
        quest_spotify: import("../../entities/quest-spotifies.entity").QuestSpotifies;
    };
    userListMapper(quest: Quest): {
        id: number;
        type: string;
        name: string;
        email: string;
    }[];
}
