import { Body, Controller, HttpException, HttpService, Post, Request } from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';
import { Permissions } from '../security/permissions.decorator';

@Controller('api/auth')
export class GatewayController {

    constructor(private httpService: HttpService) {}

    @Post('login')
    login(@Request() req) {
        return this.httpService.post('http://localhost:3000/auth/login', req.body).pipe(
            map(response => response.data?.data),
            catchError(e => {
                throw new HttpException(e.response.statusText, e.response.status);
              }));
            
    }

    @Post('register')
    register(@Body() req) {
        return this.httpService.post('http://localhost:3000/auth/register', req).pipe(
            map(response => response.data?.data),
            catchError(e => {
                throw new HttpException(e.response.statusText, e.response.status);
              }));
    }


    @Permissions('write')
    @Post('demo')
    demoApi() {
        return "true";
    }

}
