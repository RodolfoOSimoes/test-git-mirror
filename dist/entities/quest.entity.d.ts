import { Admin } from './admin.entity';
import { QuestSpotifies } from './quest-spotifies.entity';
import { QuestOpts } from './quest-opts.entity';
import { QuestPreSaves } from './quest-pre-saves.entity';
import { QuestQuestions } from './quest-questions.entity';
import { QuestSpotifyPlaylists } from './quest-spotify-playlists.entity';
import { QuestYoutubes } from './quest-youtubes.entity';
import { AccomplishedQuests } from './accomplished-quest.entity';
export declare class Quest {
    id: number;
    date_start: Date;
    kind: number;
    admin: Admin;
    score: number;
    status: boolean;
    deleted: boolean;
    created_at: Date;
    updated_at: Date;
    quest_spotifies: QuestSpotifies;
    quest_opts: QuestOpts;
    quest_pre_saves: QuestPreSaves;
    quest_questions: QuestQuestions;
    quest_spotify_playlists: QuestSpotifyPlaylists;
    quest_youtubes: QuestYoutubes;
    accomplished_count: number;
    accomplished_quests: AccomplishedQuests[];
}
