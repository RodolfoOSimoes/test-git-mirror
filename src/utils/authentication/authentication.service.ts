import { Inject, Injectable } from '@nestjs/common';
import { AuthenticationToken } from 'src/entities/authentication-token.entity';
import { User } from 'src/entities/user.entity';
import { UserPlatform } from 'src/entities/user-platform.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject('AUTHENTICATION_TOKEN_REPOSITORY')
    private authenticationRepository: Repository<AuthenticationToken>,
  ) {}

  serializeBody(body: string | object) {
    return typeof body === 'string' ? body : body['access_token'];
  }

  async create(requestInfo: any, user: User, userPlatform: UserPlatform) {
    const now: Date = new Date();
    await this.authenticationRepository.save({
      body: this.serializeBody(requestInfo.body),
      user: user,
      userPlatform: userPlatform,
      last_used_at: now,
      ip_address: requestInfo.ip_address,
      user_agent: requestInfo.user_agent,
      created_at: now,
      updated_at: now,
    });
  }
}
