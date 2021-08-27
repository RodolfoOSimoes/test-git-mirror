import { MfaInterface } from './MfaInterface';
export declare class MfaService {
    generateSecret(): MfaInterface;
    generateToken(secret: string): string;
    verifyToken(secret: string, token: string): boolean;
}
