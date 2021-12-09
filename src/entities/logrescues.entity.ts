import {
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('log_rescues')
export class LogRescues {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  user_id: number;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @Column({ type: 'int', nullable: false, default: 0 })
  qtd_product_purchased: number;

  @Column({ type: 'datetime', nullable: true })
  user_rescue_date: Date;

  @Column({ length: 255, nullable: true })
  product_code: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  qtd_product: number;

  @Column({ length: 255, nullable: true })
  message: string;
}
