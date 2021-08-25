import { User } from './user.entity';
import { Product } from './product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address.entity';

// @Index(['user_id'])
// @Index(['product_id'])
@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (entity) => entity.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((type) => Product, (entity) => entity.orders)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'boolean', nullable: true, default: false })
  sent: boolean;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @Column({ length: 255, nullable: true, unique: true })
  code_secret: string;

  @Column({ type: 'boolean', nullable: true, default: true })
  confirmation_email: boolean;

  @Column({ length: 255, nullable: true })
  tracking_code: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    nullable: true,
    default: 0,
  })
  price_of_product: number;

  @OneToOne((type) => Address, (entity) => entity.order)
  address: Address;
}
