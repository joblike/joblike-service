export class HealthCheckResponse {

    meta: HealthCheckMeta;
    data: HealthCheckData;
    error: string;

}

class HealthCheckMeta {
    flowId: "123";
}

type HealthCheckStatusType = "SUCCESS" | "FAILURE"

export class HealthCheckData {
    status: HealthCheckStatusType;

}