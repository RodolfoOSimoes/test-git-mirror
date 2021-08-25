import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(req: any, createCommentDto: CreateCommentDto): Promise<{
        message: string;
    }>;
    findAll(req: any, page: number): Promise<import("../../entities/comment.entity").Comment[]>;
    findOne(req: any, id: number): Promise<import("../../entities/comment.entity").Comment>;
    update(req: any, id: number, updateCommentDto: UpdateCommentDto): Promise<{
        message: string;
    }>;
}
