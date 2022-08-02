import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { UserPlatform } from './user-platform.entity';

@Entity('authentication_tokens')
export class AuthenticationToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  body: string;

  @ManyToOne(() => User, (entity) => entity.authentication_tokens)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => UserPlatform, (entity) => entity.authentication_tokens)
  @JoinColumn({ name: 'user_platform_id' })
  userPlatform: UserPlatform;

  @Column({ type: 'datetime', nullable: true })
  last_used_at: Date;

  @Column({ type: 'int', nullable: true })
  expires_in: number;

  @Column({ length: 255, nullable: true })
  ip_address: string;

  @Column({ type: 'text', nullable: true })
  user_agent: number;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
