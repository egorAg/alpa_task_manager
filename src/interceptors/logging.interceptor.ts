import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  logger = new Logger('HttpRequest');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const path = req.originalUrl;
    this.logger.debug('Incoming http request', {
      from: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      handler: path,
      auth: req.headers || null,
    });
    return next.handle();
  }
}
