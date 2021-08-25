import { Campaign } from './campaign.entity';
import { User } from './user.entity';
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

@Index(['statementable_type', 'statementable_id'])
@Index(['code_doc'])
// @Index(['user_id'])
// @Index(['campaign_id'])
@Entity('statements')
export class Statement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (entity) => entity.statements)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((type) => Campaign, (entity) => entity.statements)
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaign;

  @Column({
    type: 'decimal',
    precision: 13,
    scale: 2,
    nullable: true,
    default: 0.0,
  })
  amount: number;

  @Column({ type: 'int', nullable: true })
  kind: number;

  @Column({
    type: 'decimal',
    precision: 13,
    scale: 2,
    nullable: true,
    default: 0.0,
  })
  balance: number;

  @Column({ length: 255, nullable: true })
  statementable_type: string;

  @Column({ type: 'int', nullable: true })
  statementable_id: number;

  @Column({ type: 'boolean', nullable: true, default: false })
  deleted: boolean;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @Column({ length: 255, nullable: true })
  code_doc: string;

  @Column({ type: 'int', nullable: true })
  statementable_type_action: number;

  @Column({ type: 'date', nullable: true })
  expiration_date: Date;
}
