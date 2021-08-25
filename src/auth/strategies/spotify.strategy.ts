import { Strategy } from 'passport-spotify';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.SPOTIFY_CLIENT,
      clientSecret: process.env.SPOTIFY_SECRET,
      // callbackURL: `http://localhost:3000/auth/spotify/callback`,
      callbackURL: `http://localhost:3001`,
      scope:
        'user-read-recently-played user-modify-playback-state user-read-playback-state playlist-read-private user-follow-modify playlist-modify-public user-read-private user-read-email user-library-modify user-library-read',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    expires_in: string,
    profile: string,
  ) {
    return { profile, accessToken, refreshToken, expires_in };
  }
}
