import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { authenticationTokenProviders } from 'src/providers/authentication-token.providers';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [DatabaseModule],
  providers: [...authenticationTokenProviders, AuthenticationService],
  exports: [AuthenticationService, AuthenticationModule],
})
export class AuthenticationModule {}
