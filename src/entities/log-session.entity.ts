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

// @Index(['logable_type', 'logable_id'])
@Entity('log_sessions')
export class LogSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  logable_type: string;

  @ManyToOne((type) => Admin, (entity) => entity.log_sessions)
  @JoinColumn({ name: 'logable_id' })
  admin: Admin;

  @Column({ length: 255, nullable: true })
  device: string;

  @Column({ length: 255, nullable: true })
  remove_ip: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  status: boolean;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
