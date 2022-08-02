import { City } from './city.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { AccountProvider } from './account-provider.entity';
import { Address } from './address.entity';
import { Order } from './order.entity';
import { Statement } from './statement.entity';
import { UserGratification } from './user-gratification.entity';
import { CashBack } from './cash-backs.entity';
import { Badge } from './badge.entity';
import { AccomplishedQuests } from './accomplished-quest.entity';
import { Invitation } from './invitations.entity';
import { UserChallenge } from './user-challenges.entity';
import { PreSaveUser } from './pre-save-users.entity';
import { CampaignUserBalance } from './campaign-user-balance.entity';
import { CashBackLogs } from './cash-back-logs.entity';
import { RecentlyPlayeds } from './recently-playeds.entity';
import { Extract } from './extract.entity';
import { Withdrawal } from './withdrawals.entity';
import { AuthenticationToken } from './authentication-token.entity';
import { UserQuestSpotifyPlaylist } from './user-quest-spotify-playlists.entity';
import { RescueCount } from './rescue-counts.entity';
import { UserPlatform } from './user-platform.entity';

@Entity('users')
// @deprecated Index no longer used.
@Index(['provider', 'email', 'uid'], { unique: true })
@Index(['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  name: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ type: 'int', nullable: true, default: 1 })
  login_count: number;

  @Column({ type: 'boolean', default: false, nullable: true })
  deleted: boolean;

  @VersionColumn({ nullable: true })
  lock_version: number;

  @ManyToOne((type) => City)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @Column({ type: 'int', nullable: true, default: 0 })
  last_time_verified: number;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @Column({ type: 'boolean', default: false, nullable: true })
  have_accepted: boolean;

  @Column({ type: 'boolean', default: false, nullable: true })
  opt_in_mailing: boolean;

  @Column({ length: 255, nullable: true })
  invitation_code: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  profile_completed: boolean;

  @Column({
    type: 'decimal',
    precision: 13,
    scale: 2,
    nullable: true,
    default: 0.0,
  })
  balance: number;

  @Column({ type: 'boolean', default: false, nullable: true })
  situation: boolean;

  @Column({ type: 'datetime', nullable: true })
  last_update_extract: Date;

  // @deprecated Attribute no longer used.
  @Column({ length: 255, nullable: true })
  uid: string;

  // @deprecated Attribute no longer used.
  @Column({ type: 'json', nullable: true })
  credentials: string;

  // @deprecated Attribute no longer used.
  @Column({ length: 255, nullable: true })
  product: string;

  // @deprecated Attribute no longer used.
  @Column({ length: 255, nullable: true })
  provider: string;

    // @deprecated Account provider was depreciated.
  @OneToMany((type) => AccountProvider, (entity) => entity.user)
  account_providers: AccountProvider[];

  @OneToMany((type) => Address, (entity) => entity.user)
  addresses: Address[];

  @OneToMany((type) => Order, (entity) => entity.user)
  orders: Order[];

  @OneToMany((type) => Statement, (entity) => entity.user)
  statements: Statement[];

  @OneToMany((type) => UserGratification, (entity) => entity.user)
  gratifications: UserGratification[];

  @OneToMany((type) => CashBack, (entity) => entity.user)
  cashbacks: CashBack[];

  @OneToMany((type) => Badge, (entity) => entity.user)
  badges: Badge[];

  @OneToMany((type) => AccomplishedQuests, (entity) => entity.user)
  accomplished_quests: AccomplishedQuests[];

  @OneToMany((type) => Invitation, (entity) => entity.user)
  invitations: Invitation[];

  @OneToMany((type) => UserChallenge, (entity) => entity.user)
  user_challenges: UserChallenge[];

  @OneToMany((type) => PreSaveUser, (entity) => entity.user)
  pre_save_users: PreSaveUser[];

  @OneToMany((type) => CampaignUserBalance, (entity) => entity.user)
  campaign_user_balances: CampaignUserBalance[];

  @OneToMany((type) => CashBackLogs, (entity) => entity.user)
  cash_back_logs: CashBackLogs[];

  @OneToMany((type) => RecentlyPlayeds, (entity) => entity.user)
  recently_playeds: RecentlyPlayeds[];

  @OneToMany((type) => Extract, (entity) => entity.user)
  extracts: Extract[];

  @OneToMany((type) => Withdrawal, (entity) => entity.user)
  withdrawals: Withdrawal[];

  @OneToMany((type) => AuthenticationToken, (entity) => entity.user)
  authentication_tokens: AuthenticationToken[];

  @OneToMany((type) => UserQuestSpotifyPlaylist, (entity) => entity.user)
  user_quest_spotify_playlists: UserQuestSpotifyPlaylist[];

  @OneToMany((type) => RescueCount, (entity) => entity.user)
  rescue_counts: RescueCount[];

  @OneToMany((type) => UserPlatform, (entity) => entity.user)
  user_platforms: UserPlatform[];
}
