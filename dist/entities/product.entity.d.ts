import { Admin } from './admin.entity';
import { BadgeChallenge } from './badge-challenge.entity';
import { Order } from './order.entity';
export declare class Product {
    id: number;
    name: string;
    value: number;
    date_start: Date;
    date_finish: Date;
    status: boolean;
    deleted: boolean;
    quantity: number;
    quantities_purchased: number;
    code_product: string;
    lock_version: number;
    admin: Admin;
    created_at: Date;
    updated_at: Date;
    kind: number;
    badge: BadgeChallenge;
    description: string;
    orders: Order[];
}
