import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(req: any, createProductDto: CreateProductDto): Promise<{
        message: string;
    }>;
    findAll(req: any, page: number): Promise<{
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
    findOne(req: any, id: number): Promise<import("../../../entities/product.entity").Product>;
    update(req: any, id: number, updateProductDto: UpdateProductDto): Promise<{
        message: string;
    }>;
    remove(req: any, id: number): Promise<{
        message: string;
    }>;
}
