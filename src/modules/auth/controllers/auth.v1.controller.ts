import { Body, Controller, Post, Version } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserAuthDTO } from '../../user/dto/user.auth.dto';
import { UserCreateDTO } from '../../user/dto/user.create.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('Authorization')
@Controller({
  path: 'auth',
  version: ['1'],
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Version('1')
  @ApiOperation({
    summary: 'Authorize existed user',
    description: 'Sign-in by using login and password, and get an auth_token',
  })
  @ApiResponse({
    description: 'Success',
    status: 201,
    schema: {
      type: 'object',
      properties: {
        auth_token: {
          type: 'string',
          example: 'some.jwt.here',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Authorization failed',
    status: 401,
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Invalid credentials!',
        },
      },
    },
  })
  @Post('login')
  public login(@Body() data: UserAuthDTO) {
    return this.authService.login(data);
  }

  @Version('1')
  @ApiOperation({
    summary: 'Create new user',
    description:
      'Register new user in system by using login and password. Auto sign-in, returns auth_token',
  })
  @ApiResponse({
    description: 'Success',
    status: 201,
    schema: {
      type: 'object',
      properties: {
        auth_token: {
          type: 'string',
          example: 'some.jwt.tokenHere',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'User already exists',
    status: 400,
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 400,
        },
        message: {
          type: 'string',
          example: 'User with login: admin already registered',
        },
      },
    },
  })
  @Post('register')
  public register(@Body() data: UserCreateDTO) {
    return this.authService.register(data);
  }

  @Auth
  @Post('test')
  public async test(@CurrentUser() data: number) {
    return data;
  }
}
