import { Inject, Injectable } from '@nestjs/common';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { Repository } from 'typeorm';
import { AdminService } from '../admin/admin.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Campaign } from '../../entities/campaign.entity';

@Injectable()
export class CampaignService {
  constructor(
    @Inject('CAMPAIGN_REPOSITORY')
    private campaignRepository: Repository<Campaign>,
    private adminService: AdminService,
    private paginationService: PaginationService,
  ) {}

  async create(admin_id: number, data: CreateCampaignDto) {
    const admin = await this.adminService.findById(admin_id);
    await this.campaignRepository.save({
      admin: admin,
      ...data.campaign,
    });

    return { message: 'Campanha criada com sucesso.' };
  }

  async findAll(page = 1) {
    const limit = 10;
    const count = await this.campaignRepository.count();
    const data = await this.campaignRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });

    return {
      data,
      currentPage: page,
      size: Math.ceil(count / limit),
      links: this.paginationService.pagination(
        'v1/backoffice/campaigns',
        page,
        limit,
        count,
      ),
    };
  }

  async findOne(id: number) {
    return await this.campaignRepository.findOne(id);
  }

  async update(admin_id: number, id: number, data: UpdateCampaignDto) {
    const admin = await this.adminService.findById(admin_id);
    await this.campaignRepository.update(id, {
      admin: admin,
      ...data.campaign,
    });
    return { message: 'Campanha atualizada com sucesso.' };
  }

  async remove(id: number) {
    await this.campaignRepository.update(id, {
      deleted: true,
    });

    return { message: 'Campanha deletada com sucesso.' };
  }
}
