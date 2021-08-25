import { Quest } from './quest.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PreSaveUser } from './pre-save-users.entity';

// @Index(['quest_id'])
@Entity('quest_pre_saves')
export class QuestPreSaves {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  uri: string;

  @Column({ length: 255, nullable: true })
  name_artist: string;

  @Column({ length: 255, nullable: true })
  name_product: string;

  @Column({ type: 'datetime', nullable: true })
  launch_in: Date;

  @OneToOne((type) => Quest, (entity) => entity.quest_pre_saves)
  @JoinColumn({ name: 'quest_id' })
  quest: Quest;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @OneToMany((type) => PreSaveUser, (entity) => entity.quest_pre_save)
  pre_save_users: PreSaveUser[];
}
