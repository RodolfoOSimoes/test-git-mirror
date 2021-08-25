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
import { QuestSpotifies } from './quest-spotifies.entity';
import { OneToOne } from 'typeorm';
import { QuestOpts } from './quest-opts.entity';
import { QuestPreSaves } from './quest-pre-saves.entity';
import { QuestQuestions } from './quest-questions.entity';
import { QuestSpotifyPlaylists } from './quest-spotify-playlists.entity';
import { QuestYoutubes } from './quest-youtubes.entity';
import { AccomplishedQuests } from './accomplished-quest.entity';

// @Index(['admin_id'])
@Entity('quests')
export class Quest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', nullable: true })
  date_start: Date;

  @Column({ type: 'int', nullable: true })
  kind: number;

  @ManyToOne((type) => Admin)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @Column({ type: 'int', nullable: true })
  score: number;

  @Column({ type: 'boolean', nullable: true, default: true })
  status: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  deleted: boolean;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @OneToOne((type) => QuestSpotifies, (entity) => entity.quest, {
    cascade: true,
  })
  quest_spotifies: QuestSpotifies;

  @OneToOne((type) => QuestOpts, (entity) => entity.quest, {
    cascade: true,
  })
  quest_opts: QuestOpts;

  @OneToOne((type) => QuestPreSaves, (entity) => entity.quest, {
    cascade: true,
  })
  quest_pre_saves: QuestPreSaves;

  @OneToOne((type) => QuestQuestions, (entity) => entity.quest, {
    cascade: true,
  })
  quest_questions: QuestQuestions;

  @OneToOne((type) => QuestSpotifyPlaylists, (entity) => entity.quest, {
    cascade: true,
  })
  quest_spotify_playlists: QuestSpotifyPlaylists;

  @OneToOne((type) => QuestYoutubes, (entity) => entity.quest, {
    cascade: true,
  })
  quest_youtubes: QuestYoutubes;

  @Column({ type: 'int', nullable: true })
  accomplished_count: number;

  @OneToMany((type) => AccomplishedQuests, (entity) => entity.quest)
  accomplished_quests: AccomplishedQuests[];
}
