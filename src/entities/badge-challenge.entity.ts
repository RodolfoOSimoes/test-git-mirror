import { Admin } from './admin.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Badge } from './badge.entity';
import { UserChallenge } from './user-challenges.entity';

// @Index(['admin_id'])
@Entity('badge_challenges')
export class BadgeChallenge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  name: string;

  @Column({ length: 255, nullable: true })
  uri: string;

  @Column({ type: 'json', nullable: true })
  info: string;

  @Column({ type: 'int', nullable: true })
  goal: number;

  @Column({ type: 'boolean', nullable: true, default: false })
  status: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  deleted: boolean;

  @ManyToOne((type) => Admin, (entity) => entity.badge_challenges)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @Column({ type: 'int', nullable: true, default: 0 })
  completed_users_count: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  total_times_of_streamings: number;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', nullable: true, default: true })
  voucher: boolean;

  @OneToMany((type) => Product, (entity) => entity.badge)
  products: Product[];

  @OneToMany((type) => Badge, (entity) => entity.badge_challenge)
  badges: Badge[];

  @OneToMany((type) => UserChallenge, (entity) => entity.badge_challenge)
  user_challenges: UserChallenge[];
}
