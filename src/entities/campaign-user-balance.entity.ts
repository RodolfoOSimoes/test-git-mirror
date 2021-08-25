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
import { User } from './user.entity';
import { Campaign } from './campaign.entity';

// @Index(['user_id'])
// @Index(['campaign_id'])
// @Index(['admin_id'])
@Entity('campaign_user_balances')
export class CampaignUserBalance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (entity) => entity.campaign_user_balances)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((type) => Campaign, (entity) => entity.campaign_user_balances)
  @JoinColumn({ name: 'user_id' })
  campaign: Campaign;

  @Column({
    type: 'decimal',
    precision: 13,
    scale: 2,
    nullable: true,
    default: 0.0,
  })
  balance: number;

  @Column({ type: 'boolean', nullable: true, default: false })
  deleted: boolean;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
