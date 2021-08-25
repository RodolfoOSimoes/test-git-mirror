import { Injectable } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { Verify2faInterface } from './interfaces/verify_2fa';
import { LoginInterface } from './interfaces/login';
import { SendCodeInterface } from './interfaces/sendCode';
import { MfaService } from 'src/utils/mfa/mfa.service';
import { ResponseInterface } from 'src/interfaces/ResponseInterface';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { SendMailProducerService } from 'src/jobs/producers/sendMail-producer-service';
import { AdminRole } from 'src/enums/AdminRoles';
@Injectable()
export class SessionService {
  constructor(
    private adminService: AdminService,
    private mfaService: MfaService,
    private authService: AuthService,
    private sendMailProducer: SendMailProducerService,
  ) {}

  async login(loginInterface: LoginInterface) {
    const admin = await this.adminService.findByEmail(
      loginInterface.login.email,
    );

    if (!admin) {
      return {
        status: 401,
        message: 'E-mail não encontrado no sistema.',
      };
    }

    if (!admin.status) {
      return {
        status: 401,
        message: 'Sua conta está desativada.',
      };
    }

    if (
      bcrypt.compareSync(
        loginInterface.login.password + process.env.PASSWORD_SALT,
        admin.password_digest,
      )
    ) {
      const token = this.mfaService.generateToken(admin.otp_secret);
      this.sendMailProducer.sendToken(admin.email, token);
      return {
        status: 200,
        pre_token: admin.token,
        message: 'Verifique seu e-mail para obter o código de acesso.',
      };
    }

    return {
      status: 401,
      message:
        'Senha incorreta. Você pode pedir uma nova senha clicando em "Esqueci minha senha".',
    };
  }

  async verifyCode(
    verify2faInterface: Verify2faInterface,
  ): Promise<ResponseInterface> {
    try {
      const isTokenCorrect = this.mfaService.verifyToken(
        verify2faInterface.login.pre_token,
        verify2faInterface.login.code,
      );

      if (isTokenCorrect) {
        const admin = await this.adminService.findByToken(
          verify2faInterface.login.pre_token,
        );

        return {
          status: 200,
          access_token: await this.authService.login(admin),
          roles: AdminRole[admin.roles]?.toLowerCase(),
        };
      } else {
        return { status: 403, message: 'Código inválido.' };
      }
    } catch (error) {
      console.error('SessionService::VerifyCode::Error::', error);
      return { status: 500, message: 'Ops, aconteceu um erro inesperado.' };
    }
  }

  async sendCode(sendCodeInterface: SendCodeInterface) {
    try {
      const admin = await this.adminService.findByEmail(
        sendCodeInterface.email,
      );

      const token = this.mfaService.generateToken(admin.otp_secret);
      this.sendMailProducer.sendToken(sendCodeInterface.email, token);
      return {
        status: 200,
        message: 'Verifique seu e-mail para obter o código de acesso.',
      };
    } catch (error) {
      console.log('SessionService::SendCode::Error::', error);
      return { status: 500, message: 'Ops, aconteceu um erro inesperado.' };
    }
  }
}
