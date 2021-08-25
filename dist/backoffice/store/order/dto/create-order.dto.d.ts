export declare class CreateOrderDto {
    order: {
        user_id: number;
        product_id: number;
        sent: boolean;
        code_secret: string;
        confirmation_email: boolean;
        tracking_code: string;
        price_of_product: number;
    };
}
