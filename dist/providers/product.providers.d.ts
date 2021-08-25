import { Connection } from 'typeorm';
import { Product } from '../entities/product.entity';
export declare const productProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<Product>;
    inject: string[];
}[];
