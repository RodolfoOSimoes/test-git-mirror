import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('teste/cron')
  cron() {
    return this.appService.handleCron();
  }

  @Get('test')
  teste() {
    console.log('ok');
    return 'ok';
  }
}
