import { Quest } from './quest.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// @Index(['quest_id'])
@Entity('quest_questions')
export class QuestQuestions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  question: string;

  @Column({ type: 'text', nullable: true })
  answer: string;

  @OneToOne((type) => Quest, (entity) => entity.quest_questions)
  @JoinColumn({ name: 'quest_id' })
  quest: Quest;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
