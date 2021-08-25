import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AdminService } from '../admin/admin.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from '../../entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: Repository<Comment>,
    private adminService: AdminService,
  ) {}

  async create(admin_id: number, dto: CreateCommentDto) {
    const admin = await this.adminService.findById(admin_id);
    await this.commentRepository.save({
      admin: admin,
      ...dto.comment,
    });

    return { message: 'Comentário criado com sucesso.' };
  }

  async findAll(page = 1) {
    const limit = 20;
    return await this.commentRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      where: { deleted: false },
    });
  }

  async findOne(id: number) {
    return await this.commentRepository.findOne(id);
  }

  async update(admin_id: number, id: number, dto: UpdateCommentDto) {
    const admin = await this.adminService.findById(admin_id);
    await this.commentRepository.update(id, {
      admin: admin,
      ...dto.comment,
    });
    return { message: 'Comentário atualizado com sucesso.' };
  }
}
