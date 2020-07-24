import { Controller, UseGuards, Post, Request, Get, Body } from '@nestjs/common';
import { LocalAuthGuard } from '../service/local-auth.guard';
import { AuthenticationService } from '../service/authentication.service';

@Controller('auth')
export class AuthenticationController {

  constructor(private authService: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('permissions')
  async getProfile(@Body() user) {
    const permissions = await this.authService.getUserPermissions(user);
    return {
      permissions
    }
  }
  
}
