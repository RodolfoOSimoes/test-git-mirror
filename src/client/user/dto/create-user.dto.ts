export class CreateUserDto {
  user: {
    name: string;
    email: string;
    city_id: number;
    birthdate: string;
    image: {
      data: string;
    };
    phone: string;
  };
}
