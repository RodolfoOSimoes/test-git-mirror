import { AdminService } from '../admin/admin.service';
import { Verify2faInterface } from './interfaces/verify_2fa';
import { LoginInterface } from './interfaces/login';
import { SendCodeInterface } from './interfaces/sendCode';
import { MfaService } from 'src/utils/mfa/mfa.service';
import { ResponseInterface } from 'src/interfaces/ResponseInterface';
import { AuthService } from 'src/auth/auth.service';
import { SendMailProducerService } from 'src/jobs/producers/sendMail-producer-service';
export declare class SessionService {
    private adminService;
    private mfaService;
    private authService;
    private sendMailProducer;
    constructor(adminService: AdminService, mfaService: MfaService, authService: AuthService, sendMailProducer: SendMailProducerService);
    login(loginInterface: LoginInterface): Promise<{
        status: number;
        message: string;
        pre_token?: undefined;
    } | {
        status: number;
        pre_token: string;
        message: string;
    }>;
    verifyCode(verify2faInterface: Verify2faInterface): Promise<ResponseInterface>;
    sendCode(sendCodeInterface: SendCodeInterface): Promise<{
        status: number;
        message: string;
    }>;
}
