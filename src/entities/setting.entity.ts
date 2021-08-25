import { Admin } from './admin.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('settings')
export class Setting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  title: string;

  @Column({ length: 255, nullable: true })
  subtitle: string;

  @OneToOne((type) => Admin, (entity) => entity.settings)
  @JoinColumn({ name: 'admin_update_id' })
  admin: Admin;

  @Column({ type: 'text', nullable: true })
  terms_and_conditions: string;

  @Column({ type: 'int', nullable: true })
  invitation_quantity: number;

  @Column({ type: 'double', nullable: true })
  invitation_score: number;

  @Column({ type: 'double', nullable: true })
  profile_completed_score: number;

  @Column({ type: 'double', nullable: true })
  limited_gratification_score: number;

  @Column({ length: 255, nullable: true })
  uri_playlist: string;

  @Column({ length: 255, nullable: true })
  show_playlist: string;

  @Column({ length: 255, nullable: true })
  splash_screen_title: string;

  @Column({ type: 'text', nullable: true })
  splash_screen_message: string;

  @Column({ type: 'boolean', default: true, nullable: true })
  enabled_splash_screen: boolean;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: string;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: string;
}
