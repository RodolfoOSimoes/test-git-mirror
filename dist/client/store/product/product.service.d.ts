import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { StorageService } from 'src/utils/storage/storage.service';
export declare class ProductService {
    private productsRepository;
    private storageService;
    constructor(productsRepository: Repository<Product>, storageService: StorageService);
    findAll(): Promise<{
        id: string;
        type: string;
        date_start: Date;
        date_finish: Date;
        description: string;
        image: any;
        kind: string;
        name: string;
        value: number;
        product_activity: string;
        status: boolean;
    }[]>;
    findOne(id: number): Promise<Product>;
}
