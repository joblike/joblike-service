import { Controller, Get, Req, Logger } from '@nestjs/common';
import { HealthCheckResponse } from './response/health.response';

@Controller('health')
export class HealthController {

    private readonly logger = new Logger(HealthController.name);

    @Get()
    healthCheck(@Req() request: any): HealthCheckResponse {
        this.logger.log(`Health check request - meta is ${JSON.stringify(request.meta)}`);
        return new HealthCheckResponse("SUCCESS");        
    }



}
