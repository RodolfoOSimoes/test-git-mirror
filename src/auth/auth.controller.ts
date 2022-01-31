import { Controller, Get, UseGuards, Req, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SpotifyAuthGuard } from './guards/spotify-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Post('spotify/signed_in')
  async spotifySignedIn(@Req() req, @Body() body) {
    const requestInfo = {
      ip_address: req.headers['x-forwarded-for'] || req.ip,
      user_agent: req.headers['user-agent'],
      body: body,
    };

    return this.authService.saveSignedInSpotifyUser(requestInfo);
  }
}
