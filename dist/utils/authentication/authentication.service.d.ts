import { AuthenticationToken } from 'src/entities/authentication-token.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
export declare class AuthenticationService {
    private authenticationRepository;
    constructor(authenticationRepository: Repository<AuthenticationToken>);
    create(requestInfo: any, user: User): Promise<void>;
}
