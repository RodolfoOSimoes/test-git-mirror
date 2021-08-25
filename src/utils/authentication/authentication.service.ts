import { Inject, Injectable } from '@nestjs/common';
import { AuthenticationToken } from 'src/entities/authentication-token.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject('AUTHENTICATION_TOKEN_REPOSITORY')
    private authenticationRepository: Repository<AuthenticationToken>,
  ) {}

  async create(requestInfo: any, user: User) {
    try {
      await this.authenticationRepository.save({
        body: requestInfo.body,
        user: user,
        last_used_at: new Date(),
        ip_address: requestInfo.ip_address,
        user_agent: requestInfo.user_agent,
        created_at: new Date(),
        updated_at: new Date(),
      });
    } catch (error) {
      console.log(
        'AuthenticationService::Create::Erro ao salvar authentication token:: ',
        {
          requestInfo: requestInfo,
          userId: user.id,
          userEmail: user.email,
        },
      );
    }
  }
}
