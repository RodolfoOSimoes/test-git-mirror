import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/backoffice/admin/admin.service';
import { Admin } from '../entities/admin.entity';
import { AdminRole } from 'src/enums/AdminRoles';
import { UserService } from 'src/client/user/user.service';
import { User } from 'src/entities/user.entity';
import { UserPlatform } from 'src/entities/user-platform.entity';
import { SignInData, SignUpData, ApiCredentials } from 'src/etc/auth';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
    private userService: UserService,
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

  async signIn(data: SignInData): Promise<ApiCredentials> {
    const user: User = await this.userService.signIn(data);
    const credentials: ApiCredentials = {
      accessToken: this.generateAccessToken(user),
    };
    return credentials;
  }

  async signUp(data: SignUpData): Promise<any> {
    const user: User = await this.userService.signUp(data);
    const credentials: ApiCredentials = {
      accessToken: this.generateAccessToken(user),
    };
    return credentials;
  }

  private generateAccessToken(user: User): string {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
      roles: user.user_platforms.map(
        (userPlatform: UserPlatform) => userPlatform.platform.code,
      ),
    });
  }
}
