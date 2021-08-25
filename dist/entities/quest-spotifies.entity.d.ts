import { Quest } from './quest.entity';
export declare class QuestSpotifies {
    id: number;
    uri: string;
    uid: string;
    name: string;
    kind: number;
    to_listen: boolean;
    quest: Quest;
    created_at: Date;
    updated_at: Date;
    isrc: string;
}
