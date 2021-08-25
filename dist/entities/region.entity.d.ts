import { State } from './state.entity';
export declare class Region {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    states: State[];
}
