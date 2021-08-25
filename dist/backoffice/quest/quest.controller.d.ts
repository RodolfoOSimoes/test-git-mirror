import { QuestService } from './quest.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
export declare class QuestController {
    private readonly questService;
    constructor(questService: QuestService);
    create(req: any, createQuestDto: CreateQuestDto): Promise<{
        message: string;
    }>;
    findAll(req: any, page: number): Promise<{
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
            quest_opt: import("../../entities/quest-opts.entity").QuestOpts;
            quest_youtube: {
                kind: string;
                id: number;
                url: string;
                quest: import("../../entities/quest.entity").Quest;
                created_at: Date;
                updated_at: Date;
                name: string;
            };
            quest_question: import("../../entities/quest-questions.entity").QuestQuestions;
            quest_pre_save: import("../../entities/quest-pre-saves.entity").QuestPreSaves;
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
    findOne(req: any, id: number): Promise<{
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
        quest_opt: import("../../entities/quest-opts.entity").QuestOpts;
        quest_youtube: {
            kind: string;
            id: number;
            url: string;
            quest: import("../../entities/quest.entity").Quest;
            created_at: Date;
            updated_at: Date;
            name: string;
        };
        quest_question: import("../../entities/quest-questions.entity").QuestQuestions;
        quest_pre_save: import("../../entities/quest-pre-saves.entity").QuestPreSaves;
        quest_spotify_playlist: import("../../entities/quest-spotify-playlists.entity").QuestSpotifyPlaylists;
        quest_spotify: import("../../entities/quest-spotifies.entity").QuestSpotifies;
    }>;
    findUsers(req: any, id: number, page: number): Promise<{
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
    update(req: any, id: number, updateQuestDto: UpdateQuestDto): Promise<{
        message: string;
    }>;
    remove(req: any, id: number): Promise<{
        message: string;
    }>;
}
