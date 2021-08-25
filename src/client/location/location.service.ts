import { Inject, Injectable } from '@nestjs/common';
import { City } from 'src/entities/city.entity';
import { State } from 'src/entities/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationService {
  constructor(
    @Inject('CITY_REPOSITORY')
    private cityRepository: Repository<City>,
    @Inject('STATE_REPOSITORY')
    private stateRepository: Repository<State>,
  ) {}

  async findStates() {
    return await this.stateRepository.find({ order: { name: 'ASC' } });
  }

  async findCities(state_id: number) {
    const state = await this.stateRepository.findOne(state_id);

    return await this.cityRepository.find({
      where: { state: state },
      order: { name: 'ASC' },
    });
  }
}
