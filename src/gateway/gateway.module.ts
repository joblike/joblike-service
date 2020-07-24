import { Module, HttpModule } from '@nestjs/common';
import { GatewayController } from './controller/gateway.controller';
import { CoreModule } from 'src/core/core.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    HttpModule, 
    CoreModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    ],
  controllers: [GatewayController]
})
export class GatewayModule {}
