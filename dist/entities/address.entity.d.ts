import { City } from './city.entity';
import { Order } from './order.entity';
import { User } from './user.entity';
export declare class Address {
    id: number;
    recipient: string;
    full_address: string;
    cep: string;
    city: City;
    user: User;
    deleted: boolean;
    created_at: Date;
    updated_at: Date;
    cpf: string;
    street: string;
    complement: string;
    neighborhood: string;
    number: string;
    completed: boolean;
    reference: string;
    order: Order;
}
