import { State } from './state.entity';
import { Address } from './address.entity';
export declare class City {
    id: number;
    name: string;
    capital: boolean;
    address: Address;
    state: State;
    created_at: Date;
    updated_at: Date;
}
