import { Admin } from './admin.entity';
import { BadgeChallenge } from './badge-challenge.entity';
import {
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Entity, Index, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

// @Index(['code_product'])
// @Index(['admin_id'])
// @Index(['badge_challenge_id'])
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  name: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  value: number;

  @Column({ type: 'datetime', nullable: true })
  date_start: Date;

  @Column({ type: 'datetime', nullable: true })
  date_finish: Date;

  @Column({ type: 'boolean', nullable: true, default: false })
  status: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  deleted: boolean;

  @Column({ type: 'int', nullable: true })
  quantity: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  quantities_purchased: number;

  @Column({ length: 255, nullable: true })
  code_product: string;

  @VersionColumn({ nullable: true })
  lock_version: number;

  @ManyToOne((type) => Admin, (entity) => entity.products)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @Column({ type: 'int', nullable: true, default: 0 })
  kind: number;

  @ManyToOne((type) => BadgeChallenge, (entity) => entity.products)
  @JoinColumn({ name: 'badge_challenge_id' })
  badge: BadgeChallenge;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany((type) => Order, (entity) => entity.product)
  orders: Order[];
}
