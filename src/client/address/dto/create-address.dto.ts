export class CreateAddressDto {
  address: {
    recipient: string;
    cep: string;
    full_address: string;
    city_id: number;
    cpf: string;
    complement: string;
    neighborhood: string;
    number: string;
    street: string;
  };
}
