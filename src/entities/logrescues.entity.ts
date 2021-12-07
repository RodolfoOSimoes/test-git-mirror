import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm';

@Entity('log_rescues')
export class LogRescues {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  user_id: number;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @Column({ nullable: true })
  qtd_product_purchased: number;

  @Column({ nullable: true })
  product_code: string;

  @Column({ nullable: true })
  qtd_product: number;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  user_rescue_date: Date;

  @Column({ nullable: true })
  message: string;
}