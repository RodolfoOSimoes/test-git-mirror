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

// @Index(['user_id', 'provider'])
@Entity('account_providers')
export class AccountProvider {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (entity) => entity.account_providers)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ length: 255, nullable: true })
  provider: string;

  @Column({ length: 255, nullable: true })
  uid: string;

  @Column({ type: 'json', nullable: true })
  credentials: string;

  @Column({ type: 'json', nullable: true })
  info: string;

  @Column({ type: 'json', nullable: true })
  extra_info: string;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
