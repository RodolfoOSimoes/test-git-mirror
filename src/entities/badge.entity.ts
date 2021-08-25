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
import { BadgeChallenge } from './badge-challenge.entity';
import { User } from './user.entity';

// @Index(['user_id'])
// @Index(['badge_challenge_id'])
@Entity('badges')
export class Badge {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (entity) => entity.badges)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'int', nullable: true })
  kind: number;

  @Column({ type: 'int', nullable: true })
  times: number;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @ManyToOne((type) => BadgeChallenge, (entity) => entity.badges)
  @JoinColumn({ name: 'badge_challenge_id' })
  badge_challenge: BadgeChallenge;
}
