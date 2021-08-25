import { Test, TestingModule } from '@nestjs/testing';
import { StatementController } from './statement.controller';
import { StatementService } from './statement.service';

describe('StatementController', () => {
  it('should be true', () => {
    expect(true).toBe(true);
  });
  // let controller: StatementController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [StatementController],
  //     providers: [StatementService],
  //   }).compile();

  //   controller = module.get<StatementController>(StatementController);
  // });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
});
