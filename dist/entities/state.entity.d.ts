import { Region } from './region.entity';
import { City } from './city.entity';
export declare class State {
    id: number;
    name: string;
    acronym: string;
    region: Region;
    created_at: Date;
    updated_at: Date;
    cities: City[];
}
