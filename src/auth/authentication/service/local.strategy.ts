import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private authService: AuthenticationService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      this.logger.error(`An exception is about to be thrown due to bad credentials: username: ${username}, password: ${password}`);
      throw new UnauthorizedException();
    }
    return user;
  }
}