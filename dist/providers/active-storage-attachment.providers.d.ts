import { Connection } from 'typeorm';
import { ActiveStorageAttachment } from '../entities/active_storage_attachment.entity';
export declare const activeStorageAttachmentProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<ActiveStorageAttachment>;
    inject: string[];
}[];
