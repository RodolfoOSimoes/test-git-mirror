import { MailerService } from '@nestjs-modules/mailer';
import { Job } from 'bull';
export declare class SendMailConsumer {
    private mailService;
    constructor(mailService: MailerService);
    sendMailJob(job: Job): Promise<void>;
    sendNewPasswordMail(job: Job): Promise<void>;
    sendOrderMailJob(job: Job): Promise<void>;
}
