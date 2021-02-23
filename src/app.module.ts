import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HealthController } from './health/health.controller';
import { GatewayModule } from './gateway/gateway.module';
import configuration from './config/factory.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule, 
    GatewayModule, 
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      expandVariables: true,
    }),
],
  controllers: [HealthController],
})
export class AppModule {}
