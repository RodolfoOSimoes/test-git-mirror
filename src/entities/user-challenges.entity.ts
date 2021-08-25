import { User } from './user.entity';
import {
  CreateDateColumn,
  Index,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BadgeChallenge } from './badge-challenge.entity';

// @Index(['user_id', 'badge_challenge_id'], { unique: true })
// @Index(['user_id'])
// @Index(['badge_challenge_id'])
@Entity('user_challenges')
export class UserChallenge {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (entity) => entity.user_challenges)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((type) => BadgeChallenge, (entity) => entity.user_challenges)
  @JoinColumn({ name: 'badge_challenge_id' })
  badge_challenge: BadgeChallenge;

  @Column({ type: 'int', nullable: true, default: 0 })
  times: number;

  @Column({ type: 'boolean', nullable: true, default: false })
  completed: boolean;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
