import { PartialType } from '@nestjs/mapped-types';
import { CreateUserGratificationDto } from './create-user-gratification.dto';

export class UpdateUserGratificationDto extends PartialType(
  CreateUserGratificationDto,
) {}
