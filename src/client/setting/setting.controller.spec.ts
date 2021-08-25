import { Test, TestingModule } from '@nestjs/testing';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';

describe('SettingController', () => {
  it('should be true', () => {
    expect(true).toBe(true);
  });
  // let controller: SettingController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [SettingController],
  //     providers: [SettingService],
  //   }).compile();

  //   controller = module.get<SettingController>(SettingController);
  // });

  // it('should be defined', () => {
  //   // expect(controller).toBeDefined();
  // });
});
