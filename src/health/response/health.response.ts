export class HealthCheckResponse {

    private status: HealthCheckStatusType;
    
    constructor(status: HealthCheckStatusType) {
        this.status = status;
    }
}

type HealthCheckStatusType = "SUCCESS" | "FAILURE"

export class HealthCheckData {
    status: HealthCheckStatusType;

}