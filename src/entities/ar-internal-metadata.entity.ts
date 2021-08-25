import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ar_internal_metadata')
export class ArInternalMetadata {
  @PrimaryColumn({ length: 255, nullable: false })
  key: string;

  @Column({ length: 255, nullable: true })
  value: string;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
