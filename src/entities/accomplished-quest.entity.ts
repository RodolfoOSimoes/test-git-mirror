import { Quest } from './quest.entity';
import { User } from './user.entity';
import {
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// @Index(['user_id', 'quest_id'])
// @Index(['user_id'])
// @Index(['quest_id'])
@Entity('accomplished_quests')
export class AccomplishedQuests {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Quest, (entity) => entity.accomplished_quests)
  @JoinColumn({ name: 'quest_id' })
  quest: Quest;

  @ManyToOne((type) => User, (entity) => entity.accomplished_quests)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  execution_date: Date;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
