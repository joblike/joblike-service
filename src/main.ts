import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger } from './core/logger/app-logger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new AppLogger()});
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));

}
bootstrap();
