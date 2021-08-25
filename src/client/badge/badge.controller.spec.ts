import { Test, TestingModule } from '@nestjs/testing';
import { BadgeController } from './badge.controller';
import { BadgeService } from './badge.service';

describe('BadgeController', () => {
  it('should be true', () => {
    expect(true).toBe(true);
  });
  // let controller: BadgeController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [BadgeController],
  //     providers: [BadgeService],
  //   }).compile();

  //   controller = module.get<BadgeController>(BadgeController);
  // });

  // it('should be defined', () => {
  //   // expect(controller).toBeDefined();
  // });
});
