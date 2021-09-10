import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { AdminService } from '../admin/admin.service';
import { UserService } from '../user/user.service';
import { CreateUserGratificationDto } from './dto/create-user-gratification.dto';
import { UserGratification } from '../../entities/user-gratification.entity';
import { Statement } from 'src/entities/statement.entity';
import { Campaign } from 'src/entities/campaign.entity';
import { formatDate } from 'src/utils/date.utils';

@Injectable()
export class UserGratificationService {
  constructor(
    @Inject('USER_GRATIFICATION_REPOSITORY')
    private userGratificationRepository: Repository<UserGratification>,
    @Inject('STATEMENT_REPOSITORY')
    private statementRepository: Repository<Statement>,
    @Inject('CAMPAIGN_REPOSITORY')
    private campaignRepository: Repository<Campaign>,
    private adminService: AdminService,
    private userService: UserService,
  ) {}

  async create(admin_id: number, data: CreateUserGratificationDto) {
    if (data.gratification.score != data.gratification.score_gratification) {
      throw new UnauthorizedException(['Não é igual a Score']);
    }

    const admin = await this.adminService.findById(admin_id);
    const user = await this.userService.findById(data.gratification.user_id);

    const userGratification = await this.userGratificationRepository.save({
      admin: admin,
      user: user,
      deleted: false,
      score: data.gratification.score,
      created_at: new Date(),
      updated_at: new Date(),
      kind: 1,
      is_cashback: false,
    });

    const campaign = await this.campaignRepository.findOne({
      status: true,
      date_start: LessThanOrEqual(formatDate(new Date())),
      date_finish: MoreThanOrEqual(formatDate(new Date())),
    });

    await this.statementRepository.save({
      user: user,
      admin: admin,
      campaign: campaign,
      kind: 1,
      amount: data.gratification.score,
      statementable_type: 'UserGratification',
      deleted: false,
      statementable_id: userGratification.id,
      created_at: new Date(),
      updated_at: new Date(),
      expiration_date: new Date(new Date().setDate(new Date().getDate() + 90)),
    });

    return { message: 'Gratificação criada com sucesso.' };
  }

  async delete(id: number) {
    const statment = await this.statementRepository.findOne(id);

    await this.userGratificationRepository.update(statment.statementable_id, {
      updated_at: new Date(),
      deleted: true,
    });

    await this.statementRepository.delete(statment.id);
  }
}
