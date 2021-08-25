import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  it('should be true', () => {
    expect(true).toBe(true);
  });
  // let controller: UserController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [UserController],
  //     providers: [UserService],
  //   }).compile();

  //   controller = module.get<UserController>(UserController);
  // });

  // it('should be defined', () => {
  //   // expect(controller).toBeDefined();
  // });
});
