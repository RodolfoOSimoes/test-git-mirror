import { City } from './city.entity';
import { Order } from './order.entity';
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

// @Index(['city_id'], { unique: false })
// @Index(['user_id'], { unique: false })
// @Index(['order_id'], { unique: false })
@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  recipient: string;

  @Column({ length: 255, nullable: true })
  full_address: string;

  @Column({ length: 255, nullable: true })
  cep: string;

  @ManyToOne((type) => City, (entity) => entity.address)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @ManyToOne((type) => User, (entity) => entity.addresses)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'boolean', nullable: true, default: false })
  deleted: boolean;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @Column({ length: 255, nullable: true })
  cpf: string;

  @Column({ length: 255, nullable: true })
  street: string;

  @Column({ length: 255, nullable: true })
  complement: string;

  @Column({ length: 255, nullable: true })
  neighborhood: string;

  @Column({ length: 255, nullable: true })
  number: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  completed: boolean;

  @Column({ length: 255, nullable: true })
  reference: string;

  @ManyToOne((type) => Order, (entity) => entity.address)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
