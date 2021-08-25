import { CreateNewsletterDto } from './dto/create-newsletter.dto';
export declare class NewsletterService {
    create(dto: CreateNewsletterDto): Promise<string>;
}
