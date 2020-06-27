import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MetadaModel } from '../model/metada.model';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpCtx = context.switchToHttp();
    const request: any = httpCtx.getRequest<Request>();
    const meta: MetadaModel = request.meta;
    return next.handle().pipe(map(data => ({ meta, data })));
  }
}
