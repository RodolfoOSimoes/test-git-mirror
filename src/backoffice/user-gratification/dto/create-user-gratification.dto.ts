export class CreateUserGratificationDto {
  gratification: {
    user_id: number;
    score: number;
    score_gratification: number;
  };
}
