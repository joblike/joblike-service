import { Controller, HttpService, UseGuards, Post, Request, Body } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Permissions } from '../security/permissions.decorator';

@Controller('api/auth')
export class GatewayController {

    constructor(private httpService: HttpService) {}

    @Post('login')
    login(@Request() req) {
        return this.httpService.post('http://localhost:3000/auth/login', req.body).pipe(
            map(response => response.data?.data));
    }


    @Permissions('write')
    @Post('demo')
    demoApi() {
        return "true";
    }

}
