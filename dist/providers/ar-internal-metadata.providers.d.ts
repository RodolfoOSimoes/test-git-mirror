import { Connection } from 'typeorm';
import { ArInternalMetadata } from '../entities/ar-internal-metadata.entity';
export declare const arInternalMetadataProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<ArInternalMetadata>;
    inject: string[];
}[];
