import { Queue } from 'bull';
import { Address } from 'src/entities/address.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
export declare class SendMailProducerService {
    private tokenQueue;
    constructor(tokenQueue: Queue);
    sendToken(to: string, token: string): Promise<void>;
    sendOrderEmail(user: User, product: Product, address: Address): Promise<void>;
    sendNewPasswordEmail(email: string, password: string): Promise<void>;
}
