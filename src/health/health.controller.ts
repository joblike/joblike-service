import { Controller, Get, Req } from '@nestjs/common';
import { HealthCheckResponse } from './response/health.response';

@Controller('health')
export class HealthController {

    @Get()
    healthCheck(@Req() request: any): HealthCheckResponse {
        console.log(`meta is ${JSON.stringify(request.meta)}`);
        return new HealthCheckResponse("SUCCESS");        
    }



}
