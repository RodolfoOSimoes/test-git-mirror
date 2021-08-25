import { SessionService } from './session.service';
import { Verify2faInterface } from './interfaces/verify_2fa';
import { LoginInterface } from './interfaces/login';
import { SendCodeInterface } from './interfaces/sendCode';
import { Response } from 'express';
export declare class SessionController {
    private readonly sessionService;
    constructor(sessionService: SessionService);
    login(res: Response, loginInterface: LoginInterface): Promise<Response<any, Record<string, any>>>;
    verify2FA(res: Response, verify2faInterface: Verify2faInterface): Promise<Response<any, Record<string, any>>>;
    sendCode(res: Response, sendCodeInterface: SendCodeInterface): Promise<any>;
}
