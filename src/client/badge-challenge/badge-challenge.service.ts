import { Inject, Injectable } from '@nestjs/common';
import { BadgeChallenge } from 'src/entities/badge-challenge.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class BadgeChallengeService {
  constructor(
    @Inject('BADGE_CHALLENGE_REPOSITORY')
    private badgeChallengeRepository: Repository<BadgeChallenge>,
  ) {}

  async findAll() {
    return await this.badgeChallengeRepository.find({
      order: { id: 'DESC' },
      where: { deleted: false, created_at: MoreThanOrEqual(new Date()) },
    });
  }

  async findOne(id: number) {
    return await this.badgeChallengeRepository.findOne(id);
  }
}
