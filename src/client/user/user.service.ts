import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import moment from 'moment';
import { Quest } from 'src/entities/quest.entity';
import { Platform } from 'src/entities/platform.entity';
import { User } from 'src/entities/user.entity';
import { UserPlatform } from 'src/entities/user-platform.entity';
import { Setting } from 'src/entities/setting.entity';
import { Extract } from 'src/entities/extract.entity';
import { DeezerService } from 'src/apis/deezer/deezer.service';
import { AuthenticationService } from 'src/utils/authentication/authentication.service';
import { StorageService } from 'src/utils/storage/storage.service';
import {
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { UpdateTermsDto } from './dto/update-terms.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Statement } from 'src/entities/statement.entity';
import { Order } from 'src/entities/order.entity';
import { AccomplishedQuests } from 'src/entities/accomplished-quest.entity';
import {
  SignInDataInterface,
  SignUpDataInterface,
  DeezerCredentialsInterface,
} from 'src/etc/auth';
import { PlatformEnum } from 'src/etc/platform';
import { InvalidRequestException } from 'src/etc/request';
import { UserNotFoundException } from 'src/etc/user';
import { generateCode } from 'src/utils/code.utils';
import { City } from 'src/entities/city.entity';
import { Invitation } from 'src/entities/invitations.entity';
import { Campaign } from 'src/entities/campaign.entity';
import { formatDate, prepareDate } from 'src/utils/date.utils';
import { Withdrawal } from 'src/entities/withdrawals.entity';
import { generateBalance } from 'src/utils/balance.utils';

class ExternalUser {
  uid: string;
  name: string;
  email: string;
  avatar: string;
}

@Injectable()
export class UserService {
  constructor(
    @Inject('PLATFORM_REPOSITORY')
    private platformRepository: Repository<Platform>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('USER_PLATFORM_REPOSITORY')
    private userPlatformRepository: Repository<UserPlatform>,
    @Inject('QUEST_REPOSITORY')
    private questRepository: Repository<Quest>,
    @Inject('SETTINGS_REPOSITORY')
    private settingRepository: Repository<Setting>,
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,
    @Inject('STATEMENT_REPOSITORY')
    private statmentsRepository: Repository<Statement>,
    @Inject('ACCOMPLISHED_QUEST_REPOSITORY')
    private accomplishedRepository: Repository<AccomplishedQuests>,
    @Inject('EXTRACT_REPOSITORY')
    private extractRepository: Repository<Extract>,
    @Inject('CITY_REPOSITORY')
    private cityRepository: Repository<City>,
    @Inject('INVITATION_REPOSITORY')
    private invitatonRepository: Repository<Invitation>,
    @Inject('CAMPAIGN_REPOSITORY')
    private campaignRepository: Repository<Campaign>,
    @Inject('WITHDRAWAL_REPOSITORY')
    private withdrawRepository: Repository<Withdrawal>,
    private authenticationTokenService: AuthenticationService,
    private deezerService: DeezerService,
    private storageService: StorageService,
  ) {}

  async signInWithDeezer(data: SignInDataInterface): Promise<User> {
    const deezerUser = await this.getDeezerUser(data.accessToken);
    if (!deezerUser || deezerUser.error) {
      throw new InvalidRequestException('Invalid access token');
    }

    const userPlatform = await this.userPlatformRepository.findOne({
      where: {
        uid: Like(deezerUser.id),
        platform: {
          id: PlatformEnum.DEEZER,
        },
        user: {
          deleted: false,
        },
      },
      relations: [
        'user',
        'user.user_platforms',
        'user.user_platforms.platform',
      ],
    });
    if (!userPlatform) {
      throw new UserNotFoundException('Account not found');
    }

    const user: User = userPlatform.user;
    const credentials: DeezerCredentialsInterface = {
      token: data.accessToken,
      expires: false,
    };

    await Promise.all([
      this.updateUserPlatform(userPlatform, credentials),
      this.addAuthenticationLog(user, userPlatform, data),
    ]);

    return user;
  }

  signUpWithDeezer(data: SignUpDataInterface): Promise<any> {
    if (data.join) {
      return this.joinToExistingUser(data);
    } else {
      return this.createNewUser(data);
    }
  }

  private async joinToExistingUser(data: SignUpDataInterface) {
    const newConnectionInfo: ExternalUser = await this.getExternalUser(
      data.platform,
      data.accessToken,
    );
    if (!newConnectionInfo) {
      throw new InvalidRequestException('Invalid access token');
    }

    const existingConnectionInfo: ExternalUser = await this.getExternalUser(
      data.join.platform,
      data.join.accessToken,
    );
    if (!existingConnectionInfo) {
      throw new InvalidRequestException('Invalid access token to join');
    }
    const existingUserPlatform: UserPlatform = await this.authenticateUser(
      data.join.platform,
      existingConnectionInfo.uid,
    );
    if (!existingUserPlatform) {
      throw new InvalidRequestException('Invalid account to join');
    }

    const user: User = existingUserPlatform.user;
    const platform: Platform = await this.getPlatform(data.platform);
    const credentials: DeezerCredentialsInterface = {
      token: data.accessToken,
      expires: false,
    };
    const userPlatform: UserPlatform = await this.createUserPlatform(
      user,
      platform,
      newConnectionInfo.uid,
      credentials,
    );

    await this.addAuthenticationLog(user, userPlatform, data);

    const fullUser: User = await this.getUserWithPlatforms(user.id);

    return fullUser;
  }

  private async createNewUser(data: SignUpDataInterface): Promise<User> {
    const externalUser = await this.getExternalUser(
      data.platform,
      data.accessToken,
    );
    if (!externalUser) {
      throw new InvalidRequestException('Invalid access token');
    }

    if (!(await this.isAvailableAccount(data.platform, externalUser.uid))) {
      throw new InvalidRequestException('Account not available');
    }

    const user: User = await this.createUser(externalUser);
    const platform: Platform = await this.getPlatform(data.platform);
    const credentials: DeezerCredentialsInterface = {
      token: data.accessToken,
      expires: false,
    };
    const userPlatform: UserPlatform = await this.createUserPlatform(
      user,
      platform,
      externalUser.uid,
      credentials,
    );

    await this.addAuthenticationLog(user, userPlatform, data);

    const fullUser: User = await this.getUserWithPlatforms(user.id);

    return fullUser;
  }

  private async isAvailableAccount(platform: PlatformEnum, uid: string) {
    const userPlatform = await this.userPlatformRepository.findOne({
      where: {
        uid: Like(uid),
        platform: {
          id: platform,
        },
        user: {
          deleted: false,
        },
      },
      relations: ['user', 'platform'],
    });
    return userPlatform ? false : true;
  }

  private async createUser(externalExternal: ExternalUser): Promise<User> {
    const now: Date = new Date();
    let user = new User();
    user.name = externalExternal.name;
    user.email = externalExternal.email;
    user.uid = externalExternal.uid;
    user.provider = '';
    user.credentials = '{}';
    user.login_count = 1;
    user.last_time_verified = 0;
    user.have_accepted = false;
    user.opt_in_mailing = false;
    user.profile_completed = false;
    user.situation = false;
    user.invitation_code = generateCode();
    user.balance = 0;
    user.product = null;
    user.created_at = now;
    user.updated_at = now;
    user = await this.userRepository.save(user);
    await this.storeProfileImage(user, externalExternal.avatar);
    return user;
  }

  private async storeProfileImage(user, url) {
    await this.storageService.saveProfilePic(url, user.id);
  }

  private async addAuthenticationLog(
    user: User,
    userPlatform: UserPlatform,
    data: SignInDataInterface,
  ) {
    await this.authenticationTokenService.create(
      {
        body: {
          access_token: data.accessToken,
          expires: data.expires,
        },
        ip_address: data.ipAddress,
        user_agent: data.userAgent,
      },
      user,
      userPlatform,
    );
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id, {
      relations: ['city', 'city.state', 'addresses', 'invitations'],
    });

    if (user && user.deleted) {
      return new UnauthorizedException({ message: 'Usuário deletado.' });
    }

    user.orders = await this.orderRepository.find({
      where: { user: user },
    });

    user.statements = await this.statmentsRepository.find({
      where: {
        user: user,
        kind: 1,
        expiration_date: MoreThanOrEqual(prepareDate()),
      },
    });

    user.accomplished_quests = await this.accomplishedRepository.find({
      where: { user: user },
      relations: ['quest'],
    });

    user.extracts = await this.extractRepository.find({
      where: { user: user },
    });

    user.withdrawals = await this.withdrawRepository.find({
      where: {
        user: user,
        date_spent: MoreThanOrEqual(moment(new Date()).format('YYYY-MM-DD')),
      },
    });

    const setting = await this.settingRepository.findOne();

    const quests = await this.questRepository.find({
      where: { date_start: LessThan(new Date()), status: true, deleted: false },
    });

    const completed = quests.filter((quest) =>
      user.accomplished_quests.find((q) => q.quest.id == quest.id),
    );

    const image = await this.storageService.getPicture('User', user.id);

    const data = {
      id: user.id,
      type: 'users',
      situation: 'active',
      profile_completed: user.profile_completed,
      phone: user.phone,
      name: user.name,
      image: image,
      have_accepted: user.have_accepted,
      email: user.email,
      daily_order: this.hasDailyOrder(user.orders),
      birthdate: user.birthdate,
      address: { completed: user.addresses?.[0]?.completed || false },
      accounts: ['spotify'],
      city: {
        id: user.city?.id,
        name: user.city?.name,
        state: {
          id: user.city?.state?.id,
          name: user.city?.state?.name,
          acronym: user.city?.state?.acronym,
        },
      },
      invitation: {
        code: user.invitation_code,
        guests: user.invitations.length,
        of: setting.invitation_quantity,
      },
      quests: {
        completed: completed?.length || 0,
        incompleted: quests.length - (completed?.length || 0),
      },
      score: {
        general_balance:
          generateBalance(user.statements, user.withdrawals) || 0,
        expired_today: this.getExpiredToday(user.extracts) || 0,
      },
    };

    return data;
  }

  async update(id: number, dto: UpdateUserDto) {
    const city = await this.cityRepository.findOne(dto.user.city_id);
    if (dto.user.image && dto.user.image.data) {
      await this.storageService.updatePic(dto.user.image.data, id, 'User');
    }

    await this.userRepository.update(id, {
      city: city,
      birthdate: this.getBirthDate(dto.user.birthdate),
      email: dto.user.email,
      phone: dto.user.phone,
      name: dto.user.name,
    });

    return { message: 'Perfil atualizado com sucesso!' };
  }

  async updateTerms(id: number, dto: UpdateTermsDto) {
    if (dto.user.invitation_code) {
      const user = await this.userRepository.findOne({
        where: { invitation_code: dto.user.invitation_code },
        relations: ['invitations'],
      });

      const campaign = await this.campaignRepository.findOne({
        status: true,
        date_start: LessThanOrEqual(formatDate(new Date())),
        date_finish: MoreThanOrEqual(formatDate(new Date())),
      });

      const settings = await this.settingRepository.findOne();
      if (
        user &&
        settings &&
        user.invitations.length < settings.invitation_quantity
      ) {
        await this.invitatonRepository.save({
          created_at: new Date(),
          updated_at: new Date(),
          user: user,
          user_guest_id: id,
        });
        await this.statmentsRepository.save({
          amount: settings.invitation_score,
          user: user,
          campaign: campaign,
          kind: 1,
          statementable_type: 'Invitation',
          statementable_id: id,
          delete: false,
          created_at: new Date(),
          updated_at: new Date(),
          expiration_date: new Date(
            new Date().setDate(new Date().getDate() + 90),
          ),
        });
      }
    }

    await this.userRepository.update(id, {
      opt_in_mailing: dto.user.opt_in_mailing,
      have_accepted: true,
      updated_at: new Date(),
    });

    return { message: 'Usuário atualizado com sucesso' };
  }

  async store(id: number) {
    const user = await this.userRepository.findOne(id, {
      relations: ['addresses'],
    });

    const data = {
      id: user.id,
      type: 'users',
      situation: 'active',
      phone: user.phone,
      name: user.name,
      email: user.email,
      birthdate: user.birthdate,
      address: { completed: user.addresses?.[0]?.completed || false },
    };

    return data;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne(id);
    if (user) {
      await this.userRepository.update(id, {
        deleted: true,
        uid: `${user.uid}_id_${id}`,
        updated_at: new Date(),
      });
    }
    return { message: 'Usuário deletado com sucesso' };
  }

  getExpiredToday(extracts: Extract[]) {
    return extracts.reduce((current, total) => {
      if (this.compareDate(total.date_day)) {
        return current + Number(total.expired);
      }
    }, 0);
  }

  compareDate(date: Date): boolean {
    const date1 = new Date(date).toISOString().split('T')[0];
    const date2 = new Date().toISOString().split('T')[0];

    const [year, month, day] = date1.split('-');
    const [year2, month2, day2] = date2.split('-');

    return year == year2 && month == month2 && day == day2;
  }

  hasDailyOrder(orders: Order[]): boolean {
    const order = orders.find((order) => this.compareDate(order.created_at));
    return order ? true : false;
  }

  getBirthDate(birthDate: string) {
    const [day, month, year] = birthDate.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  private async getPlatform(platformId): Promise<Platform> {
    return await this.platformRepository.findOne({
      where: {
        id: platformId,
      },
    });
  }

  private async createUserPlatform(
    user: User,
    platform: Platform,
    uid: string,
    credentials: DeezerCredentialsInterface,
  ): Promise<UserPlatform> {
    const now: Date = new Date();
    let userPlatform: UserPlatform = new UserPlatform();
    userPlatform.user = user;
    userPlatform.platform = platform;
    userPlatform.uid = uid;
    userPlatform.credentials = credentials;
    userPlatform.product = null;
    userPlatform.last_product_check = now;
    userPlatform.last_activity = null;
    userPlatform.last_activity_processing = null;
    userPlatform.last_access = now;
    userPlatform.created_at = now;
    userPlatform.updated_at = now;
    userPlatform = await this.userPlatformRepository.save(userPlatform);
    return userPlatform;
  }

  private async updateUserPlatform(
    userPlatform: UserPlatform,
    credentials: DeezerCredentialsInterface,
  ) {
    await this.userPlatformRepository.update(userPlatform.id, {
      credentials: credentials,
      last_access: new Date(),
    });
  }

  private getUserWithPlatforms(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: ['user_platforms', 'user_platforms.platform'],
    });
  }

  private authenticateUser(
    platformId: number,
    uid: string,
  ): Promise<UserPlatform> {
    return this.userPlatformRepository.findOne({
      where: {
        uid: Like(uid),
        platform: {
          id: platformId,
        },
        user: {
          deleted: false,
        },
      },
      relations: [
        'user',
        'user.user_platforms',
        'user.user_platforms.platform',
      ],
    });
  }

  private async getExternalUser(
    platform: string | number,
    accessToken: string,
  ): Promise<ExternalUser> {
    switch (platform) {
      case 'deezer':
      case PlatformEnum.DEEZER:
        return await this.getDeezerUserInfo(accessToken);
      default:
        return await null;
    }
  }

  private async getDeezerUserInfo(accessToken: string): Promise<ExternalUser> {
    let deezerUser: any = null;
    try {
      deezerUser = await this.getDeezerUser(accessToken);
    } catch (e) {}

    let externalUser: ExternalUser = null;
    if (deezerUser && !deezerUser.error) {
      externalUser = new ExternalUser();
      externalUser.uid = deezerUser.id;
      externalUser.name = deezerUser.name;
      externalUser.email = deezerUser.email;
      externalUser.avatar = deezerUser.picture;
    }

    return externalUser;
  }

  private getDeezerUser(accessToken: string): Promise<any> {
    return this.deezerService.getUser(accessToken);
  }

  private getYoutubeUser(accessToken: string): Promise<any> {
    return null;
  }
}
