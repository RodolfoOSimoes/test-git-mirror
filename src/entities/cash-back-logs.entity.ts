import {
  CreateDateColumn,
  Index,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

// @Index(['user_id'])
// @Index(['played_at'])
@Entity('cash_back_logs')
export class CashBackLogs {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (entity) => entity.cash_back_logs)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ length: 255, nullable: true })
  track_id: string;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  played_at: Date;

  @Column({ length: 255, nullable: true })
  name: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  deleted: boolean;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
