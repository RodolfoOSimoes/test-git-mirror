import { User } from './user.entity';
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

// @Index(['user_id'])
@Entity('extracts')
export class Extract {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (entity) => entity.extracts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'date', nullable: true })
  date_day: Date;

  @Column({
    type: 'decimal',
    precision: 13,
    scale: 2,
    nullable: true,
    default: 0.0,
  })
  deposit: number;

  @Column({
    type: 'decimal',
    precision: 13,
    scale: 2,
    nullable: true,
    default: 0.0,
  })
  withdrawal: number;

  @Column({
    type: 'decimal',
    precision: 13,
    scale: 2,
    nullable: true,
    default: 0.0,
  })
  expired: number;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
