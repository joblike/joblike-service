import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {

  private readonly logger = new Logger(AuthenticationService.name);
  
  constructor(
    private userService: UserService,
    private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    this.logger.log(`Got a request for authentication with user: ${username}, password: ${pass}`);
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const {userId, username, roles} = await this.userService.findOne(user.username);
    const payload = {sub: userId, username, roles};
    return {
      access_token: this.jwtService.sign(payload, {expiresIn: "1d"}),
    }
  }

  async getUserPermissions(user: any) {
      return await this.userService.findUserPermissions(user.username)
  }

}
