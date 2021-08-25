import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { SessionService } from './session.service';
import { Verify2faInterface } from './interfaces/verify_2fa';
import { LoginInterface } from './interfaces/login';
import { SendCodeInterface } from './interfaces/sendCode';
import { Response } from 'express';
import { ResponseInterface } from 'src/interfaces/ResponseInterface';

@Controller('v1/backoffice')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('login')
  async login(@Res() res: Response, @Body() loginInterface: LoginInterface) {
    const result = await this.sessionService.login(loginInterface);
    return res.status(result.status).json(result);
  }

  @Post('session/verify_2fa')
  async verify2FA(
    @Res() res: Response,
    @Body() verify2faInterface: Verify2faInterface,
  ) {
    const result: ResponseInterface = await this.sessionService.verifyCode(
      verify2faInterface,
    );

    return res.status(result.status).json(result);
  }

  @Post('admins/send_code')
  async sendCode(
    @Res() res: Response,
    @Body() sendCodeInterface: SendCodeInterface,
  ): Promise<any> {
    const result = await this.sessionService.sendCode(sendCodeInterface);
    return res.status(HttpStatus.OK).json(result);
  }
}
