import {
  CreateDateColumn,
  Index,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Rescue } from './rescue.entity';
import { User } from './user.entity';

// @Index(['user_id'])
// @Index(['rescue_id'])
@Entity('cash_backs')
export class CashBack {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (entity) => entity.cashbacks)
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

  @ManyToOne((type) => Rescue, (entity) => entity.cashbacks)
  @JoinColumn({ name: 'rescue_id' })
  rescue: Rescue;

  @Column({ type: 'int' })
  rescue_id: number;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
