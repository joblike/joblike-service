import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class JoblikeExceptionFilter<T> implements ExceptionFilter {

  private readonly logger = new Logger(JoblikeExceptionFilter.name);


  catch(exception: T, host: ArgumentsHost) { 

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const { meta, path } = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const error = { status, path };

    response.status(status).json({meta, error});

    this.logger.error(`Got an error: ${exception}`);

  }
}
