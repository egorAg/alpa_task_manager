import {
  CanActivate,
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization;

      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException(
          'Invalid token type, or token not found',
        );
      }
      const secret = process.env.JWT_SECRET as string;
      const user = jwt.verify(token, secret);

      req.user = user;

      return true;
    } catch (e) {
      const logger = new Logger('Auth guard');
      logger.log('Auth failed', e.message);
      return false;
    }
  }
}
