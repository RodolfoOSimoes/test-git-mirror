export class CreateUserGratificationDto {
  gratification: {
    user_id: number;
    kind: number;
    score: number;
    score_gratification: number;
    is_cashback: boolean;
  };
}
