import { Connection } from 'typeorm';
import { AccountProvider } from '../entities/account-provider.entity';
export declare const AccountProviderProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<AccountProvider>;
    inject: string[];
}[];
