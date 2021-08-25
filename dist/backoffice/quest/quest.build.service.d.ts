import { Admin } from 'src/entities/admin.entity';
import { Quest } from 'src/entities/quest.entity';
import { CreateQuestDto } from './dto/create-quest.dto';
export declare class QuestBuildService {
    buildQuest(dto: CreateQuestDto, admin: Admin): Promise<Quest>;
}
interface QuestFactory {
    buildQuest(quest: Quest, dto: CreateQuestDto): Promise<Quest>;
}
export declare class QuestOptsFactory implements QuestFactory {
    buildQuest(quest: Quest, dto: CreateQuestDto): Promise<Quest>;
}
export declare class QuestPreSavesFactory implements QuestFactory {
    buildQuest(quest: Quest, dto: CreateQuestDto): Promise<Quest>;
}
export declare class QuestQuestionsFactory implements QuestFactory {
    buildQuest(quest: Quest, dto: CreateQuestDto): Promise<Quest>;
}
export declare class QuestSpotifiesFactory implements QuestFactory {
    buildQuest(quest: Quest, dto: CreateQuestDto): Promise<Quest>;
}
export declare class QuestSpotifyPlaylistsFactory implements QuestFactory {
    buildQuest(quest: Quest, dto: CreateQuestDto): Promise<Quest>;
}
export declare class QuestYoutubesFactory implements QuestFactory {
    buildQuest(quest: Quest, dto: CreateQuestDto): Promise<Quest>;
}
export {};
