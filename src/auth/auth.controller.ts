import { Controller, Body, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDataInterface } from 'src/etc/auth';
import { resolvePlatformId } from 'src/etc/platform';

@Controller('v1/app/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('deezer/sign_in')
  async signInWithDeezer(@Body() body) {
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
    const signUpData: SignUpDataInterface = {
      ipAddress: body.ipAddress,
      userAgent: body.userAgent,
      platform: resolvePlatformId('deezer'),
      accessToken: body.accessToken,
      expires: body.expires,
      join: body.join
        ? {
            platform: resolvePlatformId(body.join.platform),
            accessToken: body.join.accessToken,
          }
        : null,
    };

    const response: any = this.authService.signUpWithDeezer(signUpData);

    return response;
  }
}
