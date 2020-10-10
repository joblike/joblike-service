import { Module } from '@nestjs/common';
import { AuthenticationController } from './controller/authentication.controller';
import { AuthenticationService } from './service/authentication.service';
import { LocalStrategy } from './config/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../gateway/security/strategy/jwt.strategy';
import { CoreModule } from 'src/core/core.module';
import { AuthenticationRepository } from './repository/authentication.repository';


@Module({
  imports: [
    CoreModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    JwtModule.register({
      secret: process.env.JOBLIKE_TOKEN,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationRepository, AuthenticationService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
