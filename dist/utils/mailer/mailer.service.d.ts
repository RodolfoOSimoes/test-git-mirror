import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
export declare class MailerService {
    private mailService;
    constructor(mailService: NestMailerService);
    sendToken(to: string, token: string): Promise<void>;
    sendNewPassword(to: string, password: string): Promise<void>;
}
