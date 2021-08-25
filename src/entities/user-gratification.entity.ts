import { Admin } from './admin.entity';
import { User } from './user.entity';
import {
  CreateDateColumn,
  Index,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Index(['user_id'])
// @Index(['admin_id'])
@Entity('user_gratifications')
export class UserGratification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  score: number;

  @ManyToOne((type) => User, (entity) => entity.gratifications)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((type) => Admin, (entity) => entity.userGratifications)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @Column({ type: 'boolean', nullable: true, default: false })
  deleted: boolean;

  @Column({ type: 'int', nullable: true })
  kind: number;

  @Column({ type: 'boolean', nullable: true, default: false })
  is_cashback: boolean;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
