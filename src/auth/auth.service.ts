import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/backoffice/admin/admin.service';
import { Admin } from '../entities/admin.entity';
import { AdminRole } from 'src/enums/AdminRoles';
import { UserService } from 'src/client/user/user.service';
import { User } from 'src/entities/user.entity';
import { UserPlatform } from 'src/entities/user-platform.entity';
import { SignUpDataInterface } from 'src/etc/auth';

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

  async signInWithDeezer(signInData: any): Promise<any> {
    const user: User = await this.userService.signInWithDeezer(signInData);
    const accessToken: string = this.generateAccessToken(user);
    return { accessToken };
  }

  async signUpWithDeezer(signUpData: SignUpDataInterface): Promise<any> {
    const user: User = await this.userService.signUpWithDeezer(signUpData);
    const accessToken: string = this.generateAccessToken(user);
    return { accessToken };
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
