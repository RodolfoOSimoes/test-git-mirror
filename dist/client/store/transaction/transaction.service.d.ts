import { User } from 'src/entities/user.entity';
import { Statement } from 'src/entities/statement.entity';
import { Repository } from 'typeorm';
import { Address } from 'src/entities/address.entity';
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';
import { SendMailProducerService } from 'src/jobs/producers/sendMail-producer-service';
import { Withdrawal } from 'src/entities/withdrawals.entity';
import { Campaign } from 'src/entities/campaign.entity';
export declare class TransactionService {
    private userRepository;
    private statementRepository;
    private addressRepository;
    private orderRepository;
    private productRepository;
    private withdrawRepository;
    private campaignRepository;
    private sendMailProducer;
    constructor(userRepository: Repository<User>, statementRepository: Repository<Statement>, addressRepository: Repository<Address>, orderRepository: Repository<Order>, productRepository: Repository<Product>, withdrawRepository: Repository<Withdrawal>, campaignRepository: Repository<Campaign>, sendMailProducer: SendMailProducerService);
    create(user_id: number, code: string): Promise<string>;
    getToday(): string;
}
