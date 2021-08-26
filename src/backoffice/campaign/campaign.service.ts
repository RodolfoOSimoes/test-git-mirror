import { Inject, Injectable } from '@nestjs/common';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { Repository } from 'typeorm';
import { AdminService } from '../admin/admin.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Campaign } from '../../entities/campaign.entity';
import { StorageService } from 'src/utils/storage/storage.service';

@Injectable()
export class CampaignService {
  constructor(
    @Inject('CAMPAIGN_REPOSITORY')
    private campaignRepository: Repository<Campaign>,
    private adminService: AdminService,
    private paginationService: PaginationService,
    private storageService: StorageService,
  ) {}

  async create(admin_id: number, data: CreateCampaignDto) {
    const admin = await this.adminService.findById(admin_id);

    const campaing = await this.campaignRepository.save({
      admin: admin,
      name: data.campaign.name,
      slug: data.campaign.slug,
      date_finish: data.campaign.date_finish,
      date_start: data.campaign.date_start,
      status: data.campaign.status,
      created_at: new Date(),
      updated_at: new Date(),
      users_count: 0,
    });

    if (data?.campaign?.image?.data)
      await this.storageService.createPic(
        data.campaign.image.data,
        campaing.id,
        'Campaign',
      );

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
      name: data.campaign.name,
      slug: data.campaign.slug,
      date_finish: data.campaign.date_finish,
      date_start: data.campaign.date_start,
      status: data.campaign.status,
      updated_at: new Date(),
    });

    if (data?.campaign?.image?.data)
      await this.storageService.updatePic(
        data.campaign.image.data,
        id,
        'Campaign',
      );

    return { message: 'Campanha atualizada com sucesso.' };
  }

  async remove(id: number) {
    await this.campaignRepository.update(id, {
      deleted: true,
    });

    return { message: 'Campanha deletada com sucesso.' };
  }
}
