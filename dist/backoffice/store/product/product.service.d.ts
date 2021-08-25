import { AdminService } from 'src/backoffice/admin/admin.service';
import { BadgeChallengeService } from 'src/backoffice/badge-challenge/badge-challenge.service';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '../../../entities/product.entity';
import { StorageService } from 'src/utils/storage/storage.service';
export declare class ProductService {
    private productRepository;
    private adminService;
    private badgeChallengeService;
    private paginationService;
    private storageService;
    constructor(productRepository: Repository<Product>, adminService: AdminService, badgeChallengeService: BadgeChallengeService, paginationService: PaginationService, storageService: StorageService);
    create(admin_id: number, dto: CreateProductDto): Promise<{
        message: string;
    }>;
    findAll(page?: number): Promise<{
        data: {
            id: number;
            name: string;
            value: number;
            quantity: number;
            date_start: Date;
            status: boolean;
        }[];
        currentPage: number;
        size: number;
        links: {
            self: string;
            first: string;
            prev: string;
            next: string;
            last: string;
        };
    }>;
    findOne(id: number): Promise<Product>;
    update(admin_id: number, id: number, dto: UpdateProductDto): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    productMapper(product: Product): {
        id: number;
        name: string;
        value: number;
        quantity: number;
        date_start: Date;
        status: boolean;
    };
}
