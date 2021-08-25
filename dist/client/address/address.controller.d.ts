import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
export declare class AddressController {
    private readonly addressService;
    constructor(addressService: AddressService);
    create(req: any, createAddressDto: CreateAddressDto): Promise<{
        message: string;
    }>;
    find(req: any): Promise<{
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
    update(req: any, updateAddressDto: UpdateAddressDto): Promise<{
        message: string;
    }>;
}
