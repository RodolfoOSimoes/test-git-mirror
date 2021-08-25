import { Inject, Injectable } from '@nestjs/common';
import { City } from '../../../../entities/city.entity';
import { UserService } from 'src/backoffice/user/user.service';
import { Repository } from 'typeorm';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from '../../../../entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @Inject('CITY_REPOSITORY')
    private cityRepository: Repository<City>,
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<Address>,
    private userService: UserService,
  ) {}

  async findOne(id: number) {
    const user = await this.userService.findOne(id);
    return await this.addressRepository.findOne({ where: { user: user } });
  }

  async update(id: number, dto: UpdateAddressDto) {
    const user = await this.userService.findOne(id);
    const city = await this.cityRepository.findOne(dto.address.city_id);

    const address = await this.addressRepository.findOne({
      where: { user: user },
    });

    delete dto.address.city_id;
    await this.addressRepository.update(address.id, {
      ...dto.address,
      city: city,
    });

    return { message: 'Endereço atualizado com sucesso.' };
  }
}
