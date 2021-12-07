import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  user_id: number;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @Column({ nullable: true })
  qtd_product_purchased: number;
}