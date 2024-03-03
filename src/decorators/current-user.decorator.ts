import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: Request, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return req.user.id as number;
  },
);
