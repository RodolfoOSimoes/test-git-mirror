import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserPlatform } from 'src/entities/user-platform.entity';


@Entity('platforms')
export class Platform {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 48, nullable: false })
  code: string;

  @Column({ length: 255, nullable: false })
  name: string;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @OneToMany(() => UserPlatform, (entity) => entity.platform)
  user_platforms: UserPlatform[];
}
