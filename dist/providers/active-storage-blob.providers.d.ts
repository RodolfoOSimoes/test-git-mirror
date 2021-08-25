import { Connection } from 'typeorm';
import { ActiveStorageBlob } from '../entities/active_storage_blobs.entity';
export declare const activeStorageBlobProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<ActiveStorageBlob>;
    inject: string[];
}[];
