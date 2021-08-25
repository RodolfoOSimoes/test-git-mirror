import { ConfigService } from '@nestjs/config';
declare const SpotifyStrategy_base: new (...args: any[]) => any;
export declare class SpotifyStrategy extends SpotifyStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(accessToken: string, refreshToken: string, expires_in: string, profile: string): Promise<{
        profile: string;
        accessToken: string;
        refreshToken: string;
        expires_in: string;
    }>;
}
export {};
