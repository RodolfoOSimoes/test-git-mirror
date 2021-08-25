import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/backoffice/admin/admin.service';
import { Admin } from '../entities/admin.entity';
import { SpotifyService } from 'src/apis/spotify/spotify.service';
import { UserService } from 'src/client/user/user.service';
export declare class AuthService {
    private adminService;
    private jwtService;
    private userService;
    private spotifyService;
    constructor(adminService: AdminService, jwtService: JwtService, userService: UserService, spotifyService: SpotifyService);
    validateAdmin(email: string, password: string): Promise<any>;
    login(admin: Admin): Promise<string>;
    saveUser(requestInfo: any): Promise<{
        message: string;
        access_token?: undefined;
    } | {
        access_token: string;
        message?: undefined;
    }>;
}
