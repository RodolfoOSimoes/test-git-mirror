import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  constructor(private mailService: NestMailerService) {}

  async sendToken(to: string, token: string) {
    try {
      await this.mailService.sendMail({
        from: `"Filtrgame" <${process.env.SMTP_USER}>`,
        to: to,
        subject: 'Código de validação',
        text: `Código de validação: ${token}`,
        html: `<h1>Código de validação: ${token}</h1>`,
      });
    } catch (error) {
      throw Error(error.message);
    }
  }

  async sendNewPassword(to: string, password: string) {
    try {
      await this.mailService.sendMail({
        from: `"Filtrgame" <${process.env.SMTP_USER}>`,
        to: to,
        subject: 'Nova senha gerada com sucesso',
        text: `Nova senha gerada com sucesso: ${password}`,
        html: `<h1>Nova senha gerada com sucesso: ${password}</h1>`,
      });
    } catch (error) {
      throw Error(error.message);
    }
  }
}
