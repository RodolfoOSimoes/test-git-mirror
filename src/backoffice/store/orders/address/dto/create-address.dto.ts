export class CreateAddressDto {
  address: {
    recipient: string;
    full_address: string;
    cep: string;
    city_id: number;
    user_id: number;
    cpf: string;
    street: string;
    complement: string;
    neighborhood: string;
    number: string;
    completed: boolean;
    reference: string;
    order_id: number;
  };
}
