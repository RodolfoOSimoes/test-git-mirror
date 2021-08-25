import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

// @Index(['user_id'])
// @Index(['quest_id'])
@Entity('recently_playeds')
export class RecentlyPlayeds {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => User, (entity) => entity.recently_playeds)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'json', nullable: true })
  content: string;

  @Column({ type: 'datetime', nullable: true })
  checked_in: Date;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @Column({ type: 'int', nullable: true, default: 0 })
  listen_times: number;
}
