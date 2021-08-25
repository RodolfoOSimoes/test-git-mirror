import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import { MfaInterface } from './MfaInterface';

@Injectable()
export class MfaService {
  generateSecret(): MfaInterface {
    return speakeasy.generateSecret({
      name: 'filtrgame',
      length: 16,
    });
  }

  generateToken(secret: string): string {
    return speakeasy.totp({
      secret: secret,
      encoding: 'base32',
    });
  }

  verifyToken(secret: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret: secret,
      encoding: 'hex',
      window: 10,
      token: token,
    });
  }
}
