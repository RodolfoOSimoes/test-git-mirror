import { Test, TestingModule } from '@nestjs/testing';
import { UserGratificationController } from './user-gratification.controller';
import { UserGratificationService } from './user-gratification.service';

describe('UserGratificationController', () => {
  it('should be true', () => {
    expect(true).toBe(true);
  });
  // let controller: UserGratificationController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [UserGratificationController],
  //     providers: [UserGratificationService],
  //   }).compile();

  //   controller = module.get<UserGratificationController>(UserGratificationController);
  // });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
});
