import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { ApiUnauthorizedRes } from './unauthorized.decorator';

export const Auth = applyDecorators(
  ApiUnauthorizedRes,
  ApiBearerAuth('JWT-auth'),
  UseGuards(AuthGuard),
);
