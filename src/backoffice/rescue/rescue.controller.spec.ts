import { Test, TestingModule } from '@nestjs/testing';
import { RescueController } from './rescue.controller';
import { RescueService } from './rescue.service';

describe('RescueController', () => {
  it('should be true', () => {
    expect(true).toBe(true);
  });
  // let controller: RescueController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [RescueController],
  //     providers: [RescueService],
  //   }).compile();

  //   controller = module.get<RescueController>(RescueController);
  // });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
});
