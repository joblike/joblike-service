import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { MetadataMiddleware } from './middleware/metadata.middleware';

@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
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
