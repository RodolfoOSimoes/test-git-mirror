import { User } from './user.entity';
import { Product } from './product.entity';
import { Address } from './address.entity';
export declare class Order {
    id: number;
    user: User;
    product: Product;
    sent: boolean;
    created_at: Date;
    updated_at: Date;
    code_secret: string;
    confirmation_email: boolean;
    tracking_code: string;
    price_of_product: number;
    address: Address;
}
