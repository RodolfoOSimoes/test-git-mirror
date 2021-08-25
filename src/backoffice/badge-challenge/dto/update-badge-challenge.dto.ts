import { PartialType } from '@nestjs/mapped-types';
import { CreateBadgeChallengeDto } from './create-badge-challenge.dto';

export class UpdateBadgeChallengeDto extends PartialType(
  CreateBadgeChallengeDto,
) {}
