import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    find(req: any): Promise<{
        message: string;
    }>;
    spotifyCallback(req: any, body: any): Promise<{
        message: string;
        access_token?: undefined;
    } | {
        access_token: string;
        message?: undefined;
    }>;
}
