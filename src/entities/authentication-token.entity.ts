import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

// @Index(['user_id'])
// @Index(['body'])
@Entity('authentication_tokens')
export class AuthenticationToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  body: string;

  @ManyToOne((type) => User, (entity) => entity.authentication_tokens)
  @JoinColumn({ name: 'user_id' })
  user: User;

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
