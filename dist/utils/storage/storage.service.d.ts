import { ActiveStorageAttachment } from 'src/entities/active_storage_attachment.entity';
import { ActiveStorageBlob } from 'src/entities/active_storage_blobs.entity';
import { Repository } from 'typeorm';
export declare class StorageService {
    private blobRepository;
    private attachmentRepository;
    private s3client;
    constructor(blobRepository: Repository<ActiveStorageBlob>, attachmentRepository: Repository<ActiveStorageAttachment>);
    saveProfilePic(url: string, userId: number): Promise<void>;
    createPic(data: string, record_id: number, type: string): Promise<void>;
    updatePic(data: string, record_id: number, type: string): Promise<void>;
    getPicture(type: string, id: number): Promise<string>;
    generateRandomKey(): string;
}
