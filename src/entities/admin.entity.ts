import { AdminRole } from 'src/enums/AdminRoles';
import { OneToMany, OneToOne } from 'typeorm';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { BadgeChallenge } from './badge-challenge.entity';
import { Campaign } from './campaign.entity';
import { Comment } from './comment.entity';
import { LogSession } from './log-session.entity';
import { Product } from './product.entity';
import { Rescue } from './rescue.entity';
import { Setting } from './setting.entity';
import { UserGratification } from './user-gratification.entity';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true, nullable: false })
  email: string;

  @Column({ length: 255, nullable: true })
  password_digest: string;

  @Column({ length: 255, nullable: true })
  token_reset: string;

  @Column({ length: 255, nullable: true })
  token: string;

  @VersionColumn({ nullable: true })
  lock_version: number;

  @Column({ type: 'datetime', nullable: true })
  last_otp_at: Date;

  @Column({ type: 'datetime', nullable: true })
  update_password_time: Date;

  @Column({ length: 255, nullable: true })
  otp_secret: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  status: boolean;

  @Column({ type: 'boolean', default: false, nullable: true })
  deleted: boolean;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @Column({
    type: 'enum',
    enum: [0, 1, 2, 3],
    default: AdminRole.MASTER,
    nullable: true,
  })
  roles: AdminRole;

  @OneToMany((type) => BadgeChallenge, (entity) => entity.admin)
  badge_challenges: BadgeChallenge[];

  @OneToMany((type) => Campaign, (entity) => entity.admin)
  campaigns: Campaign[];

  @OneToMany((type) => Comment, (entity) => entity.admin)
  comments: Comment[];

  @OneToMany((type) => Product, (entity) => entity.admin)
  products: Product[];

  @OneToMany((type) => Rescue, (entity) => entity.admin)
  rescues: Rescue[];

  @OneToOne((type) => Setting, (entity) => entity.admin)
  settings: Setting;

  @OneToMany((type) => UserGratification, (entity) => entity.admin)
  userGratifications: UserGratification[];

  @OneToMany((type) => LogSession, (entity) => entity.admin)
  log_sessions: LogSession[];
}
