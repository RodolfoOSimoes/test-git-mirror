import { ActiveStorageBlob } from './active_storage_blobs.entity';
export declare class ActiveStorageAttachment {
    id: number;
    name: string;
    record_type: string;
    record_id: number;
    blob: ActiveStorageBlob;
    created_at: Date;
}
