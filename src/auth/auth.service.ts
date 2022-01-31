import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/backoffice/admin/admin.service';
import { Admin } from '../entities/admin.entity';
import { AdminRole } from 'src/enums/AdminRoles';
import { SpotifyService } from 'src/apis/spotify/spotify.service';
import { UserService } from 'src/client/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
    private userService: UserService,
    private spotifyService: SpotifyService,
  ) {}

  async validateAdmin(email: string, password: string): Promise<any> {
    const admin = await this.adminService.findByEmail(email);
    if (admin && bcrypt.compareSync(password, admin.password_digest)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password_digest, ...result } = admin;
      return result;
    }
    return null;
  }

  async login(admin: Admin) {
    const payload = {
      id: admin.id,
      email: admin.email,
      roles: admin.roles,
      roleName: AdminRole[admin.roles]?.toLowerCase(),
    };
    return this.jwtService.sign(payload);
  }

  async saveUser(requestInfo: any) {
    if (!requestInfo.body) {
      return { message: 'Necessário enviar código do spotify' };
    }

    const credentials = await this.spotifyService.authenticateUser(
      requestInfo.body,
    );

    const userInfo = await this.spotifyService.getUserInfo(
      credentials['access_token'],
    );

    userInfo.credentials = {
      token: credentials['access_token'],
      refresh_token: credentials['refresh_token'],
      expires: true,
      expires_in: new Date(new Date().getTime() + 3600000),
    };

    try {
      const user = await this.userService.create(requestInfo, userInfo);

      return {
        access_token: this.jwtService.sign({
          id: user.id,
          email: user.email,
          roles: 'spotify',
        }),
      };
    } catch (error) {
      throw new UnauthorizedException('Usuário deletado.');
    }
  }

  async saveSignedInSpotifyUser(requestInfo: any) {
    const spotifyAccessToken = requestInfo.body["access_token"];
    const spotifyRefreshToken = requestInfo.body["refresh_token"];

    const userInfo = await this.spotifyService.getUserInfo(
      spotifyAccessToken,
    );

    userInfo.credentials = {
      token: spotifyAccessToken,
      refresh_token: spotifyRefreshToken,
      expires: true,
      expires_in: new Date(new Date().getTime() + 3600000),
    };

    try {
      const user = await this.userService.create(requestInfo, userInfo);

      return {
        access_token: this.jwtService.sign({
          id: user.id,
          email: user.email,
          roles: 'spotify',
        }),
      };
    } catch (error) {
      throw new UnauthorizedException('Usuário deletado.');
    }
  }
}
