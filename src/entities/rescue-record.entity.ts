import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('rescue_records')
export class RescueRecords {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  user_id: number;

  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ length: 255, nullable: false })
  uri: string;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ type: 'date', nullable: true })
  date: Date;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
