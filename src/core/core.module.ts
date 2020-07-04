import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { MetadataMiddleware } from './middleware/metadata.middleware';
import { JoblikeExceptionFilter } from './exception/joblike-exception.filter';

@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_FILTER, useClass: JoblikeExceptionFilter,
    }
  ],
  controllers: []
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MetadataMiddleware)
      .forRoutes({ path: '(.*)', method: RequestMethod.ALL }, { path: '*', method: RequestMethod.ALL });
  }
}
