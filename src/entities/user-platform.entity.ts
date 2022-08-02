import { AuthenticationToken } from './authentication-token.entity';
import { Platform } from './platform.entity';
import { User } from './user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users_platforms')
@Index(['user', 'platform'], { unique: true })
export class UserPlatform {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (entity) => entity.user_platforms)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Platform, (entity) => entity.user_platforms)
  @JoinColumn({ name: 'platform_id' })
  platform: Platform;

  @Index()
  @Column({ length: 255, nullable: false })
  uid: string;

  @Column({ type: 'json', nullable: true })
  credentials: string | object;

  @Column({ length: 255, nullable: true })
  product: string;

  @Column({ type: 'datetime', nullable: true })
  last_product_check: Date;

  @Column({ type: 'datetime', nullable: true })
  last_activity: Date;

  @Column({ type: 'datetime', nullable: true })
  last_activity_processing: Date;

  @Column({ type: 'datetime', nullable: true })
  last_access: Date;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @OneToMany(() => AuthenticationToken, (entity) => entity.userPlatform)
  authentication_tokens: AuthenticationToken[];
}
