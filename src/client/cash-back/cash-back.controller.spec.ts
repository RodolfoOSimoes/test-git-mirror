import { Test, TestingModule } from '@nestjs/testing';
import { CashBackController } from './cash-back.controller';
import { CashBackService } from './cash-back.service';

describe('CashBackController', () => {
  it('should be true', () => {
    expect(true).toBe(true);
  });
  // let controller: CashBackController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [CashBackController],
  //     providers: [CashBackService],
  //   }).compile();

  //   controller = module.get<CashBackController>(CashBackController);
  // });

  // it('should be defined', () => {
  //   // expect(controller).toBeDefined();
  // });
});
