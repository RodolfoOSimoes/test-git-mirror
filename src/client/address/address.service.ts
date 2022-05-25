import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Address } from 'src/entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { City } from 'src/entities/city.entity';

@Injectable()
export class AddressService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<Address>,
    @Inject('CITY_REPOSITORY')
    private cityRepository: Repository<City>,
  ) {}

  async create(id: number, dto: CreateAddressDto) {
    const city = await this.cityRepository.findOne(dto.address.city_id);
    const user = await this.userRepository.findOne(id);
    delete dto.address.city_id;
    await this.addressRepository.save({
      ...dto.address,
      city: city,
      user: user,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return { message: 'Endereço salvo com sucesso.' };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    const address = await this.addressRepository.findOne({
      where: { user: user },
      order: { id: 'DESC' },
      relations: ['city', 'city.state'],
    });

    let addressData: any = null;
    if (address) {
      addressData = {
        id: address.id,
        cep: address.cep,
        city: {
          id: address.city?.id,
          name: address.city?.name,
          state: {
            id: address.city?.state?.id,
            acronym: address.city?.state?.acronym,
          },
        },
        complement: address.complement,
        cpf: address.cpf,
        created_at: address.created_at,
        full_address: address.full_address,
        neighborhood: address.neighborhood,
        number: address.number,
        recipient: address.recipient,
        reference: address.reference,
        street: address.street,
        updated_at: address.updated_at,
      };
    }

    return addressData;
  }

  async update(id: number, dto: UpdateAddressDto) {
    const city = await this.cityRepository.findOne(dto.address.city_id);
    const user = await this.userRepository.findOne(id);
    delete dto.address.city_id;
    await this.addressRepository.save({
      ...dto.address,
      completed: true,
      city: city,
      user: user,
      updated_at: new Date(),
      created_at: new Date(),
    });
    return { message: 'Endereço atualizado com sucesso.' };
  }
}
