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
import { QuestPreSaves } from './quest-pre-saves.entity';

// @Index(['user_id'])
// @Index(['quest_pre_save_id'])
@Entity('pre_save_users')
export class PreSaveUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (entity) => entity.pre_save_users)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((type) => QuestPreSaves, (entity) => entity.pre_save_users)
  @JoinColumn({ name: 'quest_pre_save_id' })
  quest_pre_save: QuestPreSaves;

  @Column({ type: 'boolean', nullable: true, default: false })
  saved: boolean;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
