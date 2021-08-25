import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(req: any): Promise<{
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
    findOne(req: any, id: number): Promise<import("../../../entities/product.entity").Product>;
}
