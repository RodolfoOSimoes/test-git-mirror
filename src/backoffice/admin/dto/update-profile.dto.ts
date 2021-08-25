export class UpdateAdminProfileDto {
  admin: {
    email: string;
    password_current: boolean;
    new_password: number;
    new_password_confirmation: boolean;
  };
}
