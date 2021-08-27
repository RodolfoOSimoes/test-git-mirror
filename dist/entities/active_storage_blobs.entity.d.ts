import { ActiveStorageAttachment } from './active_storage_attachment.entity';
export declare class ActiveStorageBlob {
    id: number;
    key: string;
    filename: string;
    content_type: string;
    metadata: string;
    byte_size: number;
    checksum: string;
    created_at: Date;
    attachment: ActiveStorageAttachment;
}
