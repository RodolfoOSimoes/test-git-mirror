import { LocationService } from './location.service';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    findAll(req: any): Promise<import("../../entities/state.entity").State[]>;
    findOne(req: any, state_id: number): Promise<import("../../entities/city.entity").City[]>;
}
