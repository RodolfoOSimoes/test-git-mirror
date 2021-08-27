import { Repository } from 'typeorm';
import { AdminService } from '../admin/admin.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from '../../entities/comment.entity';
export declare class CommentService {
    private commentRepository;
    private adminService;
    constructor(commentRepository: Repository<Comment>, adminService: AdminService);
    create(admin_id: number, dto: CreateCommentDto): Promise<{
        message: string;
    }>;
    findAll(page?: number): Promise<Comment[]>;
    findOne(id: number): Promise<Comment>;
    update(admin_id: number, id: number, dto: UpdateCommentDto): Promise<{
        message: string;
    }>;
}
