import { Inject, Injectable } from '@nestjs/common';
import { CashBack } from 'src/entities/cash-backs.entity';
import { Product } from 'src/entities/product.entity';
import { Quest } from 'src/entities/quest.entity';
import { Rescue } from 'src/entities/rescue.entity';
import { User } from 'src/entities/user.entity';
import { QuestMissionType } from 'src/enums/QuestTypes';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { Repository } from 'typeorm';
import { Statement } from '../../entities/statement.entity';

@Injectable()
export class StatementService {
  constructor(
    @Inject('STATEMENT_REPOSITORY')
    private statementRepository: Repository<Statement>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    @Inject('CASH_BACK_REPOSITORY')
    private cashBackRepository: Repository<CashBack>,
    @Inject('QUEST_REPOSITORY')
    private questRepository: Repository<Quest>,
    private paginationService: PaginationService,
  ) {}

  async findAll(user_id: number, page = 1) {
    const user = await this.userRepository.findOne(user_id);
    const limit = 10;
    const [statments, count] = await this.statementRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: { user: user },
      order: { id: 'DESC' },
    });

    const data = [];

    for (const statement of statments) {
      if (!statement.kind) statement.amount = statement.amount * -1;

      data.push({
        ...statement,
        description: await this.getDescription(statement),
      });
    }

    return {
      data,
      currentPage: page,
      size: Math.ceil(count / limit),
      links: this.paginationService.pagination(
        'v1/backoffice/users',
        page,
        limit,
        count,
      ),
    };
  }

  async findOne(id: number) {
    return await this.statementRepository.findOne(id);
  }

  async getDescription(statement: Statement) {
    switch (statement.statementable_type) {
      case 'Quest': {
        const quest = await this.questRepository.findOne(
          statement.statementable_id,
          {
            relations: [
              'quest_spotifies',
              'quest_pre_saves',
              'quest_questions',
            ],
          },
        );
        return await this.handleDescriptionQuest(quest);
      }
      case 'UserGratification':
        return '-';
      case 'CashBack': {
        if (statement.statementable_id < 10000) {
          const rescue = await this.userRepository.manager.findOne(Rescue, {
            where: { id: statement.statementable_id },
          });
          return `${rescue.name} - ${rescue.artists}`;
        } else {
          const cashback = await this.cashBackRepository.findOne(
            statement.statementable_id,
            {
              relations: ['rescue'],
            },
          );
          const { name, artists } = cashback.rescue;
          return `${name} - ${artists}`;
        }
      }
      case 'Product': {
        const product = await this.productRepository.findOne(
          statement.statementable_id,
          {
            select: ['name'],
          },
        );
        return product ? product.name : '-';
      }
      default:
        return '-';
    }
  }

  async handleDescriptionQuest(quest: Quest) {
    const kind = QuestMissionType[quest.kind];
    switch (kind) {
      case 'spotify_follow_artist':
        return quest.quest_spotifies.name;
      case 'spotify_follow_playlist':
        return quest.quest_spotifies.name;
      case 'spotify_listen_track':
        return quest.quest_spotifies.name;
      case 'spotify_save_track':
        return quest.quest_spotifies.name;
      case 'spotify_save_album':
        return quest.quest_spotifies.name;
      case 'question':
        return quest.quest_questions.question;
      case 'opt':
        return '-';
      case 'pre_save':
        return `${quest.quest_pre_saves.name_artist} - ${quest.quest_pre_saves.name_product}`;
      case 'youtube_subscribe':
        return '-';
      case 'youtube_watch_video':
        return '-';
      default:
        return '-';
    }
  }
}
