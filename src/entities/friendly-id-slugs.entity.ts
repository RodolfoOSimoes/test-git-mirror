import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

// @Index(['slug', 'sluggable_type', 'scope'], { unique: true })
// @Index(['sluggable_type', 'sluggable_id'])
@Entity('friendly_id_slugs')
export class FriendlyIdSlug {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  slug: string;

  @Column({ type: 'int', nullable: false })
  sluggable_id: number;

  @Column({ length: 50, nullable: true })
  sluggable_type: string;

  @Column({ length: 255, nullable: false })
  scope: string;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;
}
