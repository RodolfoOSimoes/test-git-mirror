import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('stream_records')
export class StreamRecords {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: true })
  date: Date;

  @Column({ length: 255, nullable: true })
  track_name: string;

  @Column({ length: 255, nullable: true })
  track_uri: string;

  @Column({ length: 255, nullable: true })
  artists_name: string;

  @Column({ length: 255, nullable: true })
  playlist_name: string;

  @Column({ length: 255, nullable: true })
  playlist_uri: string;

  @Column({ type: 'int', nullable: true })
  stream_quantity: number;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
