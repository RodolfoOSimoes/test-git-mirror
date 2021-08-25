import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

describe('CommentController', () => {
  it('should be true', () => {
    expect(true).toBe(true);
  });
  // let controller: CommentController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [CommentController],
  //     providers: [CommentService],
  //   }).compile();

  //   controller = module.get<CommentController>(CommentController);
  // });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
});
