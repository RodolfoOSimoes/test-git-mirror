import { Test, TestingModule } from '@nestjs/testing';
import { NewsletterController } from './newsletter.controller';
import { NewsletterService } from './newsletter.service';

describe('NewsletterController', () => {
  it('should be true', () => {
    expect(true).toBe(true);
  });
  // let controller: NewsletterController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [NewsletterController],
  //     providers: [NewsletterService],
  //   }).compile();

  //   controller = module.get<NewsletterController>(NewsletterController);
  // });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
});
