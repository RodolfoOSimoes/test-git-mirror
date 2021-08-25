export class CreateAdminDto {
  admin: {
    email: string;
    password: string;
    password_confirmation: string;
    status: boolean;
    roles: string;
  };
}
