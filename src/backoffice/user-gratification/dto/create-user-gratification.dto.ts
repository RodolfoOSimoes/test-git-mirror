export class CreateUserGratificationDto {
  gratification: {
    user_id: number;
    score: number;
    score_confirmation: number;
  };
}
