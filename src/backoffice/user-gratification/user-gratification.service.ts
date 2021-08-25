import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AdminService } from '../admin/admin.service';
import { UserService } from '../user/user.service';
import { CreateUserGratificationDto } from './dto/create-user-gratification.dto';
import { UserGratification } from '../../entities/user-gratification.entity';

@Injectable()
export class UserGratificationService {
  constructor(
    @Inject('USER_GRATIFICATION_REPOSITORY')
    private userGratificationRepository: Repository<UserGratification>,
    private adminService: AdminService,
    private userService: UserService,
  ) {}

  async create(admin_id: number, data: CreateUserGratificationDto) {
    const userGratification = new UserGratification();
    userGratification.admin = await this.adminService.findById(admin_id);
    userGratification.user = await this.userService.findById(
      data.gratification.user_id,
    );
    userGratification.kind = data.gratification.kind;
    userGratification.score = data.gratification.score;
    userGratification.is_cashback = data.gratification.is_cashback;
    await this.userGratificationRepository.save(userGratification);
    return { message: 'Gratificação criada com sucesso.' };
  }

  async findAll(page: number) {
    const limit = 10;
    return await this.userGratificationRepository.find({
      skip: page * limit,
      take: limit,
      relations: ['admin', 'user'],
    });
  }

  async remove(id: number) {
    return `This action removes a #${id} userGratification`;
  }
}
