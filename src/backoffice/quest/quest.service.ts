import { Inject, Injectable } from '@nestjs/common';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { Repository } from 'typeorm';
import { AdminService } from '../admin/admin.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { Quest } from '../../entities/quest.entity';
import { QuestBuildService } from './quest.build.service';
import { QuestMissionType, YoutubeKind } from 'src/enums/QuestTypes';
import { AdminRole } from 'src/enums/AdminRoles';
import { QuestOpts } from 'src/entities/quest-opts.entity';
import { QuestPreSaves } from 'src/entities/quest-pre-saves.entity';
import { getBrlUtcDate } from 'src/utils/date.utils';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

@Injectable()
export class QuestService {
  constructor(
    @Inject('QUEST_REPOSITORY')
    private questRepository: Repository<Quest>,
    @Inject('QUEST_OPTS_REPOSITORY')
    private questOptsRepository: Repository<QuestOpts>,
    @Inject('QUEST_PRE_SAVES_REPOSITORY')
    private questPreSaveRepository: Repository<QuestPreSaves>,
    private adminService: AdminService,
    private paginationService: PaginationService,
  ) {}

  async create(admin_id: number, dto: CreateQuestDto) {
    const admin = await this.adminService.findById(admin_id);

    const quest = await new QuestBuildService().buildQuest(dto, admin);

    await this.questRepository.save(quest);

    return { message: 'Quest criada com sucesso.' };
  }

  async findAll(page = 1) {
    const limit = 10;
    const countPromise = this.questRepository.count({
      where: { deleted: false },
    });

    const dataPromise = this.questRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        id: 'DESC',
      },
      where: { deleted: false },
      relations: [
        'accomplished_quests',
        'quest_spotifies',
        'quest_opts',
        'quest_pre_saves',
        'quest_questions',
        'quest_spotify_playlists',
        'quest_youtubes',
        'admin',
      ],
    });

    const [dataResult, count] = await Promise.all([dataPromise, countPromise]);

    const data = dataResult.map((quest) => this.questMapper(quest));

    return {
      data,
      currentPage: page,
      size: Math.ceil(count / limit),
      links: this.paginationService.pagination(
        'v1/backoffice/quests',
        page,
        limit,
        count,
      ),
    };
  }

  async findOne(id: number) {
    const result = await this.questRepository.findOne(id, {
      relations: [
        'accomplished_quests',
        'quest_spotifies',
        'quest_opts',
        'quest_pre_saves',
        'quest_questions',
        'quest_spotify_playlists',
        'quest_youtubes',
        'admin',
      ],
    });

    return {
      id: result.id,
      accomplished_count: result.accomplished_quests?.length,
      created_at: result.created_at,
      date_start: getBrlUtcDate(result.date_start),
      kind: QuestMissionType[result.kind],
      score: result.score,
      status: result.status,
      updated_at: result.updated_at,
      admin: {
        id: result.admin.id,
        type: AdminRole[result.admin.roles].toLowerCase(),
      },
      quest_opt: result.quest_opts,
      quest_youtube: {
        ...result.quest_youtubes,
        kind: YoutubeKind[result?.quest_youtubes?.kind],
      },
      quest_question: result.quest_questions,
      quest_pre_save: result.quest_pre_saves,
      quest_spotify_playlist: result.quest_spotify_playlists,
      quest_spotify: result.quest_spotifies,
    };
  }

  async findListUsers(id: number, page = 1) {
    const limit = 10;
    const size = await this.questRepository.findOne(id, {
      relations: ['accomplished_quests'],
    });

    const count = size.accomplished_quests.length;

    const [quest] = await this.questRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        id: 'DESC',
      },
      where: { id: id },
      relations: ['accomplished_quests', 'accomplished_quests.user'],
    });

    quest.date_start = getBrlUtcDate(quest.date_start);

    return {
      data: this.userListMapper(quest),
      currentPage: page,
      size: Math.ceil(count / limit),
      links: this.paginationService.pagination(
        'v1/backoffice/quests',
        page,
        limit,
        count,
      ),
    };
  }

  async update(admin_id: number, id: number, dto: UpdateQuestDto) {
    const admin = await this.adminService.findById(admin_id);
    const quest = await this.questRepository.findOne(id, {
      relations: [
        'accomplished_quests',
        'quest_spotifies',
        'quest_opts',
        'quest_pre_saves',
        'quest_questions',
        'quest_spotify_playlists',
        'quest_youtubes',
      ],
    });

    if (quest.quest_opts) {
      await this.questOptsRepository.update(quest.quest_opts.id, {
        description: dto.quest.quest_opt_attributes.description,
        updated_at: new Date(),
      });
    }

    if (quest.quest_opts) {
      await this.questOptsRepository.update(quest.quest_opts.id, {
        description: dto.quest.quest_opt_attributes.description,
        updated_at: new Date(),
      });
    }

    if (quest.quest_pre_saves) {
      await this.questPreSaveRepository.update(quest.quest_pre_saves.id, {
        name_artist: dto.quest.quest_pre_save_attributes.name_artist,
        launch_in: dto.quest.quest_pre_save_attributes.launch_in,
        name_product: dto.quest.quest_pre_save_attributes.name_product,
        updated_at: new Date(),
      });
    }

    await this.questRepository.update(id, {
      admin: admin,
      updated_at: new Date(),
      status: dto.quest.status,
    });

    return { message: 'Quest atualizada com sucesso.' };
  }

  async remove(id: number) {
    await this.questRepository.update(id, {
      status: false,
    });

    return { message: 'Quest desativada com sucesso.' };
  }

  questMapper(quest: Quest) {
    return {
      id: quest.id,
      date_start: getBrlUtcDate(quest.date_start),
      kind: QuestMissionType[quest.kind],
      status: quest.status,
      accomplished_count: quest.accomplished_quests.length,
      admin: {
        id: quest.admin.id,
        type: AdminRole[quest.admin.roles].toLowerCase(),
      },
      quest_opt: quest.quest_opts,
      quest_youtube: {
        ...quest.quest_youtubes,
        kind: YoutubeKind[quest?.quest_youtubes?.kind],
      },
      quest_question: quest.quest_questions,
      quest_pre_save: quest.quest_pre_saves,
      quest_spotify_playlist: quest.quest_spotify_playlists,
      quest_spotify: quest.quest_spotifies,
    };
  }

  userListMapper(quest: Quest) {
    return quest.accomplished_quests.map((accomplishe_quest) => {
      return {
        id: accomplishe_quest.user.id,
        type: 'users',
        name: accomplishe_quest.user.name,
        email: accomplishe_quest.user.email,
      };
    });
  }
}
