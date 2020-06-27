import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [CoreModule, AuthModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
