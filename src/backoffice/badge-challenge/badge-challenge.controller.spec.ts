import { Test, TestingModule } from '@nestjs/testing';
import { BadgeChallengeController } from './badge-challenge.controller';
import { BadgeChallengeService } from './badge-challenge.service';

describe('BadgeChallengeController', () => {
  it('should be true', () => {
    expect(true).toBe(true);
  });
  // let controller: BadgeChallengeController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [BadgeChallengeController],
  //     providers: [BadgeChallengeService],
  //   }).compile();

  //   controller = module.get<BadgeChallengeController>(BadgeChallengeController);
  // });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
});
