import { User } from 'src/entities/user.entity';
import { Address } from 'src/entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { City } from 'src/entities/city.entity';
export declare class AddressService {
    private userRepository;
    private addressRepository;
    private cityRepository;
    constructor(userRepository: Repository<User>, addressRepository: Repository<Address>, cityRepository: Repository<City>);
    create(id: number, dto: CreateAddressDto): Promise<{
        message: string;
    }>;
    findOne(id: number): Promise<{
        id: number;
        cep: string;
        city: {
            id: number;
            name: string;
            state: {
                id: number;
                acronym: string;
            };
        };
        complement: string;
        cpf: string;
        created_at: Date;
        full_address: string;
        neighborhood: string;
        number: string;
        recipient: string;
        reference: string;
        street: string;
        updated_at: Date;
    }>;
    update(id: number, dto: UpdateAddressDto): Promise<{
        message: string;
    }>;
}
