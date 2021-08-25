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
import { CashBack } from './cash-backs.entity';
import { RescueCount } from './rescue-counts.entity';

// @Index(['admin_id'])
@Entity('rescues')
export class Rescue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  uri: string;

  @Column({ length: 255, nullable: true })
  uid: string;

  @Column({ length: 255, nullable: true })
  name: string;

  @Column({ length: 255, nullable: true })
  artists: string;

  @Column({ length: 255, nullable: true })
  cover_url: string;

  @Column({ type: 'int', nullable: true })
  score: number;

  @ManyToOne((type) => Admin, (entity) => entity.rescues)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @Column({ type: 'boolean', nullable: true, default: true })
  status: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  deleted: boolean;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @Column({ type: 'int', nullable: true, default: 0 })
  rescues_count: number;

  @Column({ type: 'int', nullable: true })
  priority: number;

  @Column({ length: 255, nullable: true })
  isrc: string;

  @Column({ length: 255, nullable: true })
  playlist: string;

  @Column({ type: 'json', nullable: true })
  info_playlist: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  limited: boolean;

  @Column({ type: 'int', nullable: true })
  limit_streams: number;

  @OneToMany((type) => CashBack, (entity) => entity.rescue)
  cashbacks: CashBack[];

  @OneToMany((type) => RescueCount, (entity) => entity.rescue)
  rescue_counts: RescueCount[];
}
