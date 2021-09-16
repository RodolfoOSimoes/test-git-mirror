export class CreateProductDto {
  product: {
    name: string;
    value: number;
    date_start: string;
    date_finish: string;
    status: boolean;
    quantity: number;
    quantities_purchased: number;
    image: {
      data: string;
    };
    procuct_code: string;
    kind: number;
    badge_challenge_id: number;
    description: string;
  };
}
