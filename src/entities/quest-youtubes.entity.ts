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
@Entity('quest_youtubes')
export class QuestYoutubes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  url: string;

  @Column({
    type: 'enum',
    enum: [0, 1, 2],
    nullable: true,
  })
  kind: number;

  @OneToOne((type) => Quest, (entity) => entity.quest_spotifies)
  @JoinColumn({ name: 'quest_id' })
  quest: Quest;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @Column({ length: 255, nullable: true })
  name: string;
}
