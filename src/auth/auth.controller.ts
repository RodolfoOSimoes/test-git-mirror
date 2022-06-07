/* Spotify removed from Filtrgame (2022/04).
import { Controller, Get, UseGuards, Req, Body, Post } from '@nestjs/common'; */
import { Controller, Req, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
/* Spotify removed from Filtrgame (2022/04).
import { SpotifyAuthGuard } from './guards/spotify-auth.guard'; */

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* Spotify removed from Filtrgame (2022/04).
  @UseGuards(SpotifyAuthGuard)
  @Get('spotify')
  async find(@Req() req) {
    return { message: 'Spotify' };
  }

  @Post('spotify/callback')
  async spotifyCallback(@Req() req, @Body() body) {
    const requestInfo = {
      ip_address: req.headers['x-forwarded-for'] || req.ip,
      user_agent: req.headers['user-agent'],
      body: body.code,
    };

    return this.authService.saveUser(requestInfo);
  }
  */

  @Post('deezer/signin')
  async signInWithDeezer(@Req() req, @Body() body) {
    // TODO: validate body.

    const accessData = {
      ipAddress: body.ipAddress,
      userAgent: body.userAgent,
      accessToken: body.accessToken,
      expires: body.expires,
    };

    let response: any = null;
    try {
      response = this.authService.signInWithDeezer(accessData);
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }

    return response;
  }

  /* Spotify removed from Filtrgame (2022/04).
  @Post('spotify/signed_in')
  async spotifySignedIn(@Req() req, @Body() body) {
    const requestInfo = {
      ip_address: req.headers['x-forwarded-for'] || req.ip,
      user_agent: req.headers['user-agent'],
      body: body,
    };

    return this.authService.saveSignedInSpotifyUser(requestInfo);
  }
  */
}
