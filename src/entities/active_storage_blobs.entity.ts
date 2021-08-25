import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ActiveStorageAttachment } from './active_storage_attachment.entity';

// @Index(['user_id', 'provider'])
@Entity('active_storage_blobs')
export class ActiveStorageBlob {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false, unique: true })
  key: string;

  @Column({ length: 255, nullable: false })
  filename: string;

  @Column({ length: 255, nullable: true })
  content_type: string;

  @Column({ type: 'text', nullable: true })
  metadata: string;

  @Column({ type: 'int', nullable: false })
  byte_size: number;

  @Column({ length: 255, nullable: false })
  checksum: string;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @OneToOne((type) => ActiveStorageAttachment, (entity) => entity.blob)
  attachment: ActiveStorageAttachment;
}
