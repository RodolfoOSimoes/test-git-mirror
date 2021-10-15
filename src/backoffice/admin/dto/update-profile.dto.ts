export class UpdateAdminProfileDto {
  admin: {
    email: string;
    password_current: string;
    new_password: string;
    new_password_confirmation: string;
  };
}
