import { Controller, Get } from '@nestjs/common';
import { HealthCheckResponse, HealthCheckData } from './response/health.response';

@Controller('health')
export class HealthController {

    @Get()
    healthCheck(): HealthCheckResponse {
        const response: HealthCheckResponse = new HealthCheckResponse();
        const data = new HealthCheckData();
        data.status = "SUCCESS";
        response.data = data;
        
        return response;
    }



}
