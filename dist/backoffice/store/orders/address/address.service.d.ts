import { City } from '../../../../entities/city.entity';
import { UserService } from 'src/backoffice/user/user.service';
import { Repository } from 'typeorm';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from '../../../../entities/address.entity';
export declare class AddressService {
    private cityRepository;
    private addressRepository;
    private userService;
    constructor(cityRepository: Repository<City>, addressRepository: Repository<Address>, userService: UserService);
    findOne(id: number): Promise<Address>;
    update(id: number, dto: UpdateAddressDto): Promise<{
        message: string;
    }>;
}
