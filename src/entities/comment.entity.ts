import { Admin } from './admin.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// @Index(['commentable_type', 'commentable_id'])
// @Index(['admin_id'])
@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  body: string;

  @ManyToOne((type) => Admin, (entity) => entity.comments)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @Column({ length: 255, nullable: true })
  commentable_type: string;

  @Column({ type: 'int', nullable: true })
  commentable_id: number;

  @Column({ type: 'boolean', nullable: true, default: false })
  status: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  deleted: boolean;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
