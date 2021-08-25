import { Inject, Injectable } from '@nestjs/common';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { Repository } from 'typeorm';
import { AdminService } from '../admin/admin.service';
import { CreateBadgeChallengeDto } from './dto/create-badge-challenge.dto';
import { UpdateBadgeChallengeDto } from './dto/update-badge-challenge.dto';
import { BadgeChallenge } from '../../entities/badge-challenge.entity';

@Injectable()
export class BadgeChallengeService {
  constructor(
    @Inject('BADGE_CHALLENGE_REPOSITORY')
    private badgeChallengeRepository: Repository<BadgeChallenge>,
    private adminService: AdminService,
    private paginationService: PaginationService,
  ) {}

  async create(admin_id: number, dto: CreateBadgeChallengeDto) {
    const admin = await this.adminService.findById(admin_id);
    await this.badgeChallengeRepository.save({
      admin: admin,
      ...dto.challenge,
    });

    return { message: 'Challenge criado com sucesso.' };
  }

  async findAll(page = 1) {
    const limit = 20;
    const count = await this.badgeChallengeRepository.count({
      where: { deleted: false },
    });

    const data = (
      await this.badgeChallengeRepository.find({
        skip: (page - 1) * limit,
        take: limit,
        where: { deleted: false },
        order: { id: 'DESC' },
      })
    )?.map((badgeChallenger: BadgeChallenge) => {
      return this.badgeChallengeMapper(badgeChallenger);
    });

    return {
      data,
      currentPage: page,
      size: Math.ceil(count / limit),
      links: this.paginationService.pagination(
        'v1/backoffice/badge_challenges',
        page,
        limit,
        count,
      ),
    };
  }

  async findOne(id: number) {
    return await this.badgeChallengeRepository.findOne(id);
  }

  async update(admin_id: number, id: number, dto: UpdateBadgeChallengeDto) {
    const admin = await this.adminService.findById(admin_id);
    await this.badgeChallengeRepository.update(id, {
      admin: admin,
      ...dto.challenge,
    });
    return { message: 'Challenge atualizado com sucesso.' };
  }

  async remove(id: number) {
    await this.badgeChallengeRepository.update(id, {
      deleted: true,
    });

    return { message: 'Challenge deletado com sucesso.' };
  }

  badgeChallengeMapper(badgeChallenger: BadgeChallenge) {
    return {
      id: badgeChallenger.id,
      name: badgeChallenger.name,
      total_times_of_streamings: badgeChallenger.total_times_of_streamings,
      status: badgeChallenger.status,
    };
  }
}
