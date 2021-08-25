import { Connection } from 'typeorm';
import { Invitation } from '../entities/invitations.entity';
export declare const invitationProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<Invitation>;
    inject: string[];
}[];
