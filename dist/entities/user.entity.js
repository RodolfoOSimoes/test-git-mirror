"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const city_entity_1 = require("./city.entity");
const typeorm_1 = require("typeorm");
const address_entity_1 = require("./address.entity");
const order_entity_1 = require("./order.entity");
const statement_entity_1 = require("./statement.entity");
const user_gratification_entity_1 = require("./user-gratification.entity");
const cash_backs_entity_1 = require("./cash-backs.entity");
const badge_entity_1 = require("./badge.entity");
const accomplished_quest_entity_1 = require("./accomplished-quest.entity");
const account_provider_entity_1 = require("./account-provider.entity");
const invitations_entity_1 = require("./invitations.entity");
const user_challenges_entity_1 = require("./user-challenges.entity");
const pre_save_users_entity_1 = require("./pre-save-users.entity");
const campaign_user_balance_entity_1 = require("./campaign-user-balance.entity");
const cash_back_logs_entity_1 = require("./cash-back-logs.entity");
const recently_playeds_entity_1 = require("./recently-playeds.entity");
const extract_entity_1 = require("./extract.entity");
const withdrawals_entity_1 = require("./withdrawals.entity");
const authentication_token_entity_1 = require("./authentication-token.entity");
const user_quest_spotify_playlists_entity_1 = require("./user-quest-spotify-playlists.entity");
const rescue_counts_entity_1 = require("./rescue-counts.entity");
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "provider", void 0);
__decorate([
    typeorm_1.Column({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "birthdate", void 0);
__decorate([
    typeorm_1.Column({ length: 20, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "uid", void 0);
__decorate([
    typeorm_1.Column({ type: 'json', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "credentials", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true, default: 1 }),
    __metadata("design:type", Number)
], User.prototype, "login_count", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', default: false, nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "deleted", void 0);
__decorate([
    typeorm_1.VersionColumn({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "lock_version", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => city_entity_1.City),
    typeorm_1.JoinColumn({ name: 'city_id' }),
    __metadata("design:type", city_entity_1.City)
], User.prototype, "city", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "last_time_verified", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', default: false, nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "have_accepted", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', default: false, nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "opt_in_mailing", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "invitation_code", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', default: false, nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "profile_completed", void 0);
__decorate([
    typeorm_1.Column({
        type: 'decimal',
        precision: 13,
        scale: 2,
        nullable: true,
        default: 0.0,
    }),
    __metadata("design:type", Number)
], User.prototype, "balance", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', default: false, nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "situation", void 0);
__decorate([
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "product", void 0);
__decorate([
    typeorm_1.Column({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "last_time_checked_product", void 0);
__decorate([
    typeorm_1.Column({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "last_heard", void 0);
__decorate([
    typeorm_1.Column({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "last_update_extract", void 0);
__decorate([
    typeorm_1.OneToMany((type) => address_entity_1.Address, (entity) => entity.user),
    __metadata("design:type", Array)
], User.prototype, "addresses", void 0);
__decorate([
    typeorm_1.OneToMany((type) => order_entity_1.Order, (entity) => entity.user),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
__decorate([
    typeorm_1.OneToMany((type) => statement_entity_1.Statement, (entity) => entity.user),
    __metadata("design:type", Array)
], User.prototype, "statements", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_gratification_entity_1.UserGratification, (entity) => entity.user),
    __metadata("design:type", Array)
], User.prototype, "gratifications", void 0);
__decorate([
    typeorm_1.OneToMany((type) => cash_backs_entity_1.CashBack, (entity) => entity.user),
    __metadata("design:type", Array)
], User.prototype, "cashbacks", void 0);
__decorate([
    typeorm_1.OneToMany((type) => badge_entity_1.Badge, (entity) => entity.user),
    __metadata("design:type", Array)
], User.prototype, "badges", void 0);
__decorate([
    typeorm_1.OneToMany((type) => accomplished_quest_entity_1.AccomplishedQuests, (entity) => entity.user),
    __metadata("design:type", Array)
], User.prototype, "accomplished_quests", void 0);
__decorate([
    typeorm_1.OneToMany((type) => account_provider_entity_1.AccountProvider, (entity) => entity.user),
    __metadata("design:type", Array)
], User.prototype, "account_providers", void 0);
__decorate([
    typeorm_1.OneToMany((type) => invitations_entity_1.Invitation, (entity) => entity.user),
    __metadata("design:type", Array)
], User.prototype, "invitations", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_challenges_entity_1.UserChallenge, (entity) => entity.user),
    __metadata("design:type", Array)
], User.prototype, "user_challenges", void 0);
__decorate([
    typeorm_1.OneToMany((type) => pre_save_users_entity_1.PreSaveUser, (entity) => entity.user),
    __metadata("design:type", Array)
], User.prototype, "pre_save_users", void 0);
__decorate([
    typeorm_1.OneToMany((type) => campaign_user_balance_entity_1.CampaignUserBalance, (entity) => entity.user),
    __metadata("design:type", Array)
], User.prototype, "campaign_user_balances", void 0);
__decorate([
    typeorm_1.OneToMany((type) => cash_back_logs_entity_1.CashBackLogs, (entity) => entity.user),
    __metadata("design:type", Array)
], User.prototype, "cash_back_logs", void 0);
__decorate([
    typeorm_1.OneToMany((type) => recently_playeds_entity_1.RecentlyPlayeds, (entity) => entity.user),
    __metadata("design:type", Array)
], User.prototype, "recently_playeds", void 0);
__decorate([
    typeorm_1.OneToMany((type) => extract_entity_1.Extract, (entity) => entity.user),
    __metadata("design:type", Array)
], User.prototype, "extracts", void 0);
__decorate([
    typeorm_1.OneToMany((type) => withdrawals_entity_1.Withdrawal, (entity) => entity.user),
    __metadata("design:type", Array)
], User.prototype, "withdrawals", void 0);
__decorate([
    typeorm_1.OneToMany((type) => authentication_token_entity_1.AuthenticationToken, (entity) => entity.user),
    __metadata("design:type", Array)
], User.prototype, "authentication_tokens", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_quest_spotify_playlists_entity_1.UserQuestSpotifyPlaylist, (entity) => entity.user),
    __metadata("design:type", Array)
], User.prototype, "user_quest_spotify_playlists", void 0);
__decorate([
    typeorm_1.OneToMany((type) => rescue_counts_entity_1.RescueCount, (entity) => entity.user),
    __metadata("design:type", Array)
], User.prototype, "rescue_counts", void 0);
User = __decorate([
    typeorm_1.Entity('users'),
    typeorm_1.Index(['provider', 'email', 'uid'], { unique: true }),
    typeorm_1.Index(['provider', 'uid'], { unique: true }),
    typeorm_1.Index(['product'])
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map