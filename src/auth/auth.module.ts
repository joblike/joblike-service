import { Module } from '@nestjs/common';  
import { AuthenticationController } from './authentication/contorller/authentication.controller';
import { AuthenticationService } from './authentication/service/authentication.service';
import { LocalStrategy } from './authentication/service/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../gateway/security/strategy/jwt.strategy';
import { CoreModule } from '../core/core.module';
import { UserService } from './user/user.service';
//import { AuthenticationRepository } from './repository/authentication.repository';


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
  providers: [/*AuthenticationRepository, */ AuthenticationService, LocalStrategy, JwtStrategy, UserService]
})
export class AuthModule {}
