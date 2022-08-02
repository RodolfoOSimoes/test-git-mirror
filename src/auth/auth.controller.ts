import { Controller, Body, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('v1/app/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('deezer/sign_in')
  async signInWithDeezer(@Body() body) {
    // TODO: validate body.

    const response: any = this.authService.signInWithDeezer({
      ipAddress: body.ipAddress,
      userAgent: body.userAgent,
      accessToken: body.accessToken,
      expires: body.expires,
    });

    return response;
  }

  @Put('deezer/sign_up')
  async signUpWithDeezer(@Body() body) {
    // TODO: validate body.

    const response: any = this.authService.signUpWithDeezer({
      ipAddress: body.ipAddress,
      userAgent: body.userAgent,
      accessToken: body.accessToken,
      expires: body.expires,
    });

    return response;
  }
}
