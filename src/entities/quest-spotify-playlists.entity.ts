import { Quest } from './quest.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserQuestSpotifyPlaylist } from './user-quest-spotify-playlists.entity';

@Entity('quest_spotify_playlists')
export class QuestSpotifyPlaylists {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  uri: string;

  @Column({ type: 'int', nullable: true })
  tracks_count: number;

  @Column({ type: 'int', nullable: true })
  points_for_track: number;

  @Column({ type: 'text', nullable: true })
  tracks: string;

  @Column({ type: 'text', nullable: true })
  isrcs: string;

  @OneToOne((type) => Quest, (entity) => entity.quest_spotify_playlists)
  @JoinColumn({ name: 'quest_id' })
  quest: Quest;

  @Column({ length: 255, nullable: true })
  question: string;

  @Column({ type: 'int', nullable: true })
  points_for_question: number;

  @Column({ length: 255, nullable: true })
  answer: string;

  @Column({ length: 255, nullable: true })
  question_2: string;

  @Column({ length: 255, nullable: true })
  answer_2: string;

  @Column({ type: 'int', nullable: true })
  points_for_question_2: number;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @Column({ length: 255, nullable: true })
  name: string;

  @Column({ length: 255, nullable: true })
  cover_url: string;

  @OneToMany(
    (type) => UserQuestSpotifyPlaylist,
    (entity) => entity.quest_spotify_playlists,
  )
  user_quest_spotify_playlists: UserQuestSpotifyPlaylist[];
}
