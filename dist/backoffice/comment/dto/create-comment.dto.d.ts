export declare class CreateCommentDto {
    comment: {
        commentable_type: string;
        commentable_id: number;
        body: string;
        status: boolean;
        deleted: boolean;
    };
}
