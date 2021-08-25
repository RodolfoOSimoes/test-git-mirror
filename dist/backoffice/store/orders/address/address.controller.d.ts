import { AddressService } from './address.service';
import { UpdateAddressDto } from './dto/update-address.dto';
export declare class AddressController {
    private readonly addressService;
    constructor(addressService: AddressService);
    findOne(req: any, id: number): Promise<import("../../../../entities/address.entity").Address>;
    update(req: any, id: number, updateAddressDto: UpdateAddressDto): Promise<{
        message: string;
    }>;
}
