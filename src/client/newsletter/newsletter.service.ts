import { Injectable } from '@nestjs/common';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';

@Injectable()
export class NewsletterService {
  async create(dto: CreateNewsletterDto) {
    return 'This action adds a new newsletter';
  }
}
