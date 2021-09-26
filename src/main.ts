import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const rateLimit = require('express-rate-limit');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
