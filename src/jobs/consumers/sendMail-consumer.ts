import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('sendMail-queue')
export class SendMailConsumer {
  constructor(private mailService: MailerService) {}

  @Process('sendMail-job')
  async sendMailJob(job: Job) {
    const { data } = job;

    try {
      await this.mailService.sendMail({
        from: `"Filtrgame" <filtrgame@sonymusic.com>`,
        to: data.to,
        subject: 'Código de validação',
        html: `<h1>Código de validação: ${data.token}</h1>`,
      });
    } catch (error) {
      throw Error(error.message);
    }
  }

  @Process('sendNewPasswordMail-job')
  async sendNewPasswordMail(job: Job) {
    const { data } = job;

    try {
      await this.mailService.sendMail({
        from: `"Filtrgame" <filtrgame@sonymusic.com>`,
        to: data.email,
        subject: 'Nova senha gerada com sucesso',
        html: `<h1>Nova senha gerada com sucesso: ${data.password.toString()}</h1>`,
      });
    } catch (error) {
      throw Error(error.message);
    }
  }

  @Process('sendOrderMail-job')
  async sendOrderMailJob(job: Job) {
    const { data } = job;
    try {
      const html = `Oi! ${data?.user?.name}<br><br>
       
       Seu resgate foi confirmado :)<br><br>
       
       Obrigada por participar do Filtr Game! Agora vamos separar seu resgate e em breve ele será entregue a transportadora.<br>
       
       Entrega de 7 a 30 dias úteis.<br><br>
    
       <b>${data?.product?.name}</b><br>
    
       f$ ${data?.product?.value}<br><br>
    
       Frete grátis<br>
    
       ${data?.address?.street}<br>
    
       Número: ${data?.address?.number}<br>

       Bairro: ${data?.address?.neighborhood}<br>

       Complemento: ${data?.address?.complement}<br>

       Cep: ${data?.address?.cep}<br>

       ${data?.address?.city?.name} - ${data?.address?.city?.state?.acronym}

       <br><br>
       Continue ligado nas novidades do <a href="${process.env.FILTRGAME_URL}" target="_blank">Filtr Game</a>.
       <br><br>
       Grande abraço! :-)`;

      await this.mailService.sendMail({
        from: `"Filtrgame" <filtrgame@sonymusic.com>`,
        to: data.user.email,
        subject: 'Recebemos seu pedido!',
        html: html,
      });
    } catch (error) {
      console.log(error);
      throw Error(error.message);
    }
  }
}
