import { State } from './state.entity';
import {
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './address.entity';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  name: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  capital: boolean;

  @OneToOne((type) => Address, (entity) => entity.city)
  address: Address;

  @ManyToOne((type) => State, (entity) => entity.cities)
  @JoinColumn({ name: 'state_id' })
  state: State;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
