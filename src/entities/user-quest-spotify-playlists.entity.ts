import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { QuestSpotifyPlaylists } from './quest-spotify-playlists.entity';

@Entity('user_quest_spotify_playlists')
export class UserQuestSpotifyPlaylist {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (entity) => entity.user_quest_spotify_playlists)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(
    (type) => QuestSpotifyPlaylists,
    (entity) => entity.user_quest_spotify_playlists,
  )
  @JoinColumn({ name: 'quest_spotify_playlist_id' })
  quest_spotify_playlists: QuestSpotifyPlaylists;

  @Column({ type: 'text', nullable: true })
  tracks: string;

  @Column({ type: 'text', nullable: true })
  isrcs: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  complete: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  question_answered: boolean;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
