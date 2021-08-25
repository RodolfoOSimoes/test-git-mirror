import { Admin } from './admin.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Statement } from './statement.entity';
import { CampaignUserBalance } from './campaign-user-balance.entity';

// @Index(['admin_id'])
@Entity('campaigns')
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  name: string;

  @Column({ length: 255, nullable: true, unique: true })
  slug: string;

  @Column({ type: 'date', nullable: true })
  date_finish: Date;

  @Column({ type: 'boolean', nullable: true, default: false })
  status: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  deleted: boolean;

  @ManyToOne((type) => Admin, (entity) => entity.campaigns)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @Column({ type: 'int', nullable: true })
  users_count: number;

  @Column({ type: 'date', nullable: true })
  date_start: Date;

  @OneToMany((type) => Statement, (entity) => entity.campaign)
  statements: Statement[];

  @OneToMany((type) => CampaignUserBalance, (entity) => entity.campaign)
  campaign_user_balances: CampaignUserBalance[];
}
