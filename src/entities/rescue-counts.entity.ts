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
import { User } from './user.entity';
import { Rescue } from './rescue.entity';

@Entity('rescue_counts')
export class RescueCount {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (entity) => entity.rescue_counts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((type) => Rescue, (entity) => entity.rescue_counts)
  @JoinColumn({ name: 'rescue_id' })
  rescue: Rescue;

  @Column({ type: 'int', nullable: true })
  times: number;

  @Column({ type: 'date', nullable: true })
  created_date: Date;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
