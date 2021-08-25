import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ActiveStorageBlob } from './active_storage_blobs.entity';

// @Index(['record_type', 'record_id', 'name', 'blob_id'])
// @Index(['blob_id'])
@Entity('active_storage_attachments')
export class ActiveStorageAttachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 255, nullable: false, unique: true })
  record_type: string;

  @Column({ type: 'int', nullable: false })
  record_id: number;

  @OneToOne((type) => ActiveStorageBlob, (entity) => entity.attachment)
  @JoinColumn({ name: 'blob_id' })
  blob: ActiveStorageBlob;

  @CreateDateColumn({ type: 'datetime', nullable: false })
  created_at: Date;
}
