export class UpdateTermsDto {
  user: {
    opt_in_mailing: boolean;
    invitation_code: string;
  };
}
