import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AdminModule } from 'src/backoffice/admin/admin.module';
import { AuthController } from './auth.controller';
import { SpotifyStrategy } from './strategies/spotify.strategy';
import { UserModule } from 'src/client/user/user.module';
import { DatabaseModule } from 'src/database/database.module';
import { SpotifyService } from 'src/apis/spotify/spotify.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AdminModule,
    PassportModule,
    UserModule,
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    SpotifyStrategy,
    SpotifyService,
  ],
  exports: [AuthService, JwtModule, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
