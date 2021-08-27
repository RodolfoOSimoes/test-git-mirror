import { City } from 'src/entities/city.entity';
import { State } from 'src/entities/state.entity';
import { Repository } from 'typeorm';
export declare class LocationService {
    private cityRepository;
    private stateRepository;
    constructor(cityRepository: Repository<City>, stateRepository: Repository<State>);
    findStates(): Promise<State[]>;
    findCities(state_id: number): Promise<City[]>;
}
