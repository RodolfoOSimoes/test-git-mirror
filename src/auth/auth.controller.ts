import { Controller, Body, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInData, SignUpData } from 'src/etc/auth';

@Controller('v1/app/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('deezer/sign_in')
  signInWithDeezer(@Body() body) {
    return this.authService.signIn(body as SignInData);
  }

  @Put('deezer/sign_up')
  async signUpWithDeezer(@Body() body) {
    return this.authService.signUp(body as SignUpData);
  }

  @Post('youtube/sign_in')
  signInWithYoutube(@Body() body) {
    return this.authService.signIn(body as SignInData);
  }

  @Put('youtube/sign_up')
  signUpWithYoutube(@Body() body) {
    return this.authService.signUp(body as SignUpData);
  }
}
