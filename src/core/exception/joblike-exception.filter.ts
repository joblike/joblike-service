import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class JoblikeExceptionFilter<T> implements ExceptionFilter {

  private readonly logger = new Logger(JoblikeExceptionFilter.name);


  catch(exception: T, host: ArgumentsHost) { 

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const { meta, path } = ctx.getRequest();

    let status;
    let message;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = "Internal Server Error";

    }

    const error = { status, message, path };

    response.status(status).json({meta, error});

    this.logger.error(`Got an error: ${exception}`);

  }
}
