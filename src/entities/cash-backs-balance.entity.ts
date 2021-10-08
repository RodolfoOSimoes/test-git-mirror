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
@Entity('cash_backs_balance')
export class CashBackBalance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (entity) => entity.cashbacks)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'integer' })
  user_id: number;

  @ManyToOne((type) => Rescue, (entity) => entity.cashbacks)
  @JoinColumn({ name: 'rescue_id' })
  rescue: Rescue;

  @Column({ type: 'integer' })
  rescue_id: number;

  @Column({
    type: 'decimal',
    precision: 13,
    scale: 2,
    nullable: true,
    default: 0.0,
  })
  balance: number;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
