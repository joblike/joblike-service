import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './core/interceptor/response.interceptor';
import { AppLogger } from './core/logger/app-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new AppLogger()});
  await app.listen(3000);
}
bootstrap();
