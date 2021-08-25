import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Quest } from 'src/entities/quest.entity';
import { User } from 'src/entities/user.entity';
import { Setting } from 'src/entities/setting.entity';
import { Extract } from 'src/entities/extract.entity';
import { AuthenticationService } from 'src/utils/authentication/authentication.service';
import { StorageService } from 'src/utils/storage/storage.service';
import { LessThan, Repository } from 'typeorm';
import { UpdateTermsDto } from './dto/update-terms.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Statement } from 'src/entities/statement.entity';
import { Order } from 'src/entities/order.entity';
import { AccomplishedQuests } from 'src/entities/accomplished-quest.entity';
import { generateCode } from 'src/utils/code.utils';
import { City } from 'src/entities/city.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
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
    private authenticationTokenService: AuthenticationService,
    private storageService: StorageService,
  ) {}

  async create(requestInfo: any, data: any) {
    const user = await this.userRepository.findOne({
      uid: data['id'],
    });

    if (user) {
      await this.authenticationTokenService.create(requestInfo, user);

      return {
        id: user.id,
        email: user.email,
      };
    }

    if (!user) {
      const newUser = new User();
      newUser.name = data['display_name'];
      newUser.email = data['email'];
      newUser.uid = data['id'];
      newUser.provider = 'spotify';
      newUser.credentials = data['credentials'];
      newUser.login_count = 1;
      newUser.last_time_verified = new Date().getTime();
      newUser.created_at = new Date();
      newUser.updated_at = new Date();
      newUser.have_accepted = false;
      newUser.opt_in_mailing = false;
      newUser.profile_completed = false;
      newUser.situation = false;
      newUser.situation = false;
      newUser.invitation_code = generateCode();
      newUser.balance = 0;
      newUser.product = data['product'];

      const savedUser = await this.userRepository.save(newUser);

      await this.authenticationTokenService.create(requestInfo, savedUser);
      await this.storageService.saveProfilePic(
        data['images'][0]['url'],
        savedUser.id,
      );

      return {
        id: savedUser.id,
        email: newUser.email,
      };
    }
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id, {
      relations: ['city', 'city.state', 'addresses', 'invitations'],
    });

    if (user.deleted) {
      return new UnauthorizedException({ message: 'Usuário bloqueado' });
    }

    user.orders = await this.orderRepository.find({
      where: { user: user },
    });

    user.statements = await this.statmentsRepository.find({
      where: { user: user, kind: 1 },
    });

    user.accomplished_quests = await this.accomplishedRepository.find({
      where: { user: user },
      relations: ['quest'],
    });

    user.extracts = await this.extractRepository.find({
      where: { user: user },
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
        of: setting.invitation_quantity - user.invitations.length,
      },
      quests: {
        completed: completed?.length || 0,
        incompleted: quests.length - (completed?.length || 0),
      },
      score: {
        general_balance:
          this.getGeneralBalance(user.statements, user.extracts) || 0,
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
      birthdate: dto.user.birthdate,
      email: dto.user.email,
      phone: dto.user.phone,
      name: dto.user.name,
    });

    return { message: 'Perfil atualizado com sucesso!' };
  }

  async updateTerms(id: number, dto: UpdateTermsDto) {
    this.userRepository.update(id, {
      opt_in_mailing: dto.user.opt_in_mailing,
      have_accepted: true,
    });

    return { message: 'Usuário atualizado com sucesso' };
  }

  async remove(id: number) {
    await this.userRepository.update(id, {
      deleted: true,
    });

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

  getGeneralBalance(statements: Statement[], extracts: Extract[]): number {
    const amount = statements.reduce(
      (current, total) => current + Number(total.amount),
      0,
    );

    const withdrawals = extracts.reduce(
      (current, total) => current + Number(total.withdrawal),
      0,
    );

    const expired = extracts.reduce(
      (current, total) => current + Number(total.expired),
      0,
    );

    return amount - withdrawals - expired;
  }

  hasDailyOrder(orders: Order[]): boolean {
    const order = orders.find((order) => this.compareDate(order.created_at));
    return order ? true : false;
  }
}
