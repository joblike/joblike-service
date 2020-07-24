import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HealthController } from './health/health.controller';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [AuthModule, GatewayModule],
  controllers: [HealthController],
})
export class AppModule {}
